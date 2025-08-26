<?php

use App\Enums\HttpStatus;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'permission' => PermissionMiddleware::class,
            'role' => RoleMiddleware::class,
        ]);
        $middleware->redirectGuestsTo(function () {
            throw new HttpException(HttpStatus::UNAUTHORIZED, 'Unauthenticated');
        });
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Exception $e) {
            $status = $e instanceof HttpException ? $e->getStatusCode() : 500;
            return response()->json(['error' => [config('common.generic_error') => $e->getMessage()]], $status);
        });
    })->create();
