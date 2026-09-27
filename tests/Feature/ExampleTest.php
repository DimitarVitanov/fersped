<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_root_always_redirects_to_macedonian(): void
    {
        $this->withHeaders(['Accept-Language' => 'mk'])->get('/')->assertRedirect('/mk');
        $this->withHeaders(['Accept-Language' => 'en-US,en'])->get('/')->assertRedirect('/mk');
    }

    public function test_locale_homes_return_successful_response(): void
    {
        $this->get('/mk')->assertStatus(200);
        $this->get('/en')->assertStatus(200);
    }

    public function test_service_pages_return_successful_response(): void
    {
        foreach (array_keys(config('content.locales.mk.services.items')) as $slug) {
            $this->get("/mk/services/{$slug}")->assertStatus(200);
        }
    }
}
