"use client";

import type React from "react";

import { useState } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";
import { createStoreAction } from "@/app/actions";
import { rootDomain } from "@/lib/utils";

type CreateState = {
  error?: string;
  success?: string;
  subdomain?: string;
  title?: string;
  template_id?: string;
};

function SubdomainInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="subdomain">Subdomain</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="subdomain"
            name="subdomain"
            placeholder="your-subdomain"
            defaultValue={defaultValue}
            className="w-full rounded-r-none focus:z-10"
            required
          />
        </div>
        <span className="bg-gray-100 px-3 border border-l-0 border-input rounded-r-md text-gray-500 min-h-[36px] flex items-center">
          .{rootDomain}
        </span>
      </div>
    </div>
  );
}

function TitleInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title">Store Title</Label>
      <Input
        id="title"
        name="title"
        placeholder="My Amazing Store"
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}

function TemplateSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="template_id">Template</Label>
      <select
        id="template_id"
        name="template_id"
        className="w-full p-2 border border-gray-300 rounded-md"
        defaultValue={defaultValue}
        required
      >
        <option value="">Select a template</option>
        <option value="template-1">
          Modern Store - Clean, gradient design
        </option>
        <option value="template-2">
          Minimal Store - Elegant, minimal design
        </option>
      </select>
    </div>
  );
}

export function SubdomainForm() {
  const [state, action, isPending] = useActionState<CreateState, FormData>(
    createStoreAction,
    {}
  );

  return (
    <form action={action} className="space-y-4">
      <SubdomainInput defaultValue={state?.subdomain} />
      <TitleInput defaultValue={state?.title} />
      <TemplateSelect defaultValue={state?.template_id} />

      {state?.error && (
        <div className="text-sm text-red-500">{state.error}</div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Store"}
      </Button>
    </form>
  );
}
