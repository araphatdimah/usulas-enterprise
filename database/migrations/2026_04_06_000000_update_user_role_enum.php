<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'role')) {
            return;
        }

        DB::transaction(function () {
            DB::statement(
                <<<'SQL'
CREATE TABLE users_new (
    "id" integer primary key autoincrement not null,
    "name" varchar not null,
    "email" varchar not null,
    "email_verified_at" datetime,
    "password" varchar not null,
    "remember_token" varchar,
    "created_at" datetime,
    "updated_at" datetime,
    "two_factor_secret" text,
    "two_factor_recovery_codes" text,
    "two_factor_confirmed_at" datetime,
    "role" varchar check ("role" in ('admin', 'customer', 'staff')) not null default 'customer'
);
SQL
            );

            DB::statement('INSERT INTO users_new (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, two_factor_secret, two_factor_recovery_codes, two_factor_confirmed_at, role) SELECT id, name, email, email_verified_at, password, remember_token, created_at, updated_at, two_factor_secret, two_factor_recovery_codes, two_factor_confirmed_at, role FROM users');
            DB::statement('DROP TABLE users');
            DB::statement('ALTER TABLE users_new RENAME TO users');
            DB::statement('CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users(email)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('users', 'role')) {
            return;
        }

        DB::transaction(function () {
            DB::statement(
                <<<'SQL'
CREATE TABLE users_old (
    "id" integer primary key autoincrement not null,
    "name" varchar not null,
    "email" varchar not null,
    "email_verified_at" datetime,
    "password" varchar not null,
    "remember_token" varchar,
    "created_at" datetime,
    "updated_at" datetime,
    "two_factor_secret" text,
    "two_factor_recovery_codes" text,
    "two_factor_confirmed_at" datetime,
    "role" varchar check ("role" in ('admin', 'customer')) not null default 'customer'
);
SQL
            );

            DB::statement('INSERT INTO users_old (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, two_factor_secret, two_factor_recovery_codes, two_factor_confirmed_at, role) SELECT id, name, email, email_verified_at, password, remember_token, created_at, updated_at, two_factor_secret, two_factor_recovery_codes, two_factor_confirmed_at, role FROM users');
            DB::statement('DROP TABLE users');
            DB::statement('ALTER TABLE users_old RENAME TO users');
            DB::statement('CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users(email)');
        });
    }
};
