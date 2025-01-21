/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    generatedContent?: {
      title: string;
      description: string;
      randomValue: number;
    };
  }
}