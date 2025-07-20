<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GitHubService
{
    protected string $token;
    protected string $baseUrl = 'https://api.github.com';

    public function __construct()
    {
        $this->token = config('services.github.token');
    }

    public function getPinnedRepositories(string $githubHandle)
    {
        $cacheKey = "github_pinned_{$githubHandle}";

        return Cache::remember($cacheKey, now()->addHours(6), function () use ($githubHandle) {
            if (empty($this->token)) {
                Log::error('GitHub token is not configured.');
                return [];
            }
            
            $query = <<<GQL
            query {
                user(login: "{$githubHandle}") {
                    pinnedItems(first: 6, types: REPOSITORY) {
                        nodes {
                            ... on Repository {
                                name
                                description
                                url
                                stargazers {
                                    totalCount
                                }
                                forks {
                                    totalCount
                                }
                                primaryLanguage {
                                    name
                                    color
                                }
                            }
                        }
                    }
                }
            }
            GQL;
            
            $response = Http::withToken($this->token)
                ->post("{$this->baseUrl}/graphql", ['query' => $query]);

            if ($response->failed()) {
                Log::error('GitHub API request failed.', ['status' => $response->status(), 'body' => $response->body()]);
                return [];
            }
            
            // Even with a successful request, GraphQL can return errors in the body
            if (isset($response->json()['errors'])) {
                Log::error('GitHub GraphQL query returned errors.', ['errors' => $response->json()['errors']]);
                return [];
            }

            // This is the key fix: Use the null coalescing operator (??) to default to an empty array
            // This ensures that even if the path doesn't exist in the JSON, we return [] instead of null.
            return $response->json('data.user.pinnedItems.nodes') ?? [];
        });
    }
}