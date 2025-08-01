"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { deleteSubdomainAction, createStoreAction } from "@/app/actions";
import { rootDomain, protocol } from "@/lib/utils";
import { sampleTemplates } from "@/lib/templates";
import { useState } from "react";

type Store = {
  id: string;
  subdomain: string;
  title: string;
  template_id: string;
  created_at: string;
  updated_at: string;
};

type DeleteState = {
  error?: string;
  success?: string;
};

type CreateState = {
  error?: string;
  success?: string;
};

function DashboardHeader() {
  // TODO: You can add authentication here with your preferred auth provider

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Store Management</h1>
      <div className="flex items-center gap-4">
        <Link
          href={`${protocol}://${rootDomain}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {rootDomain}
        </Link>
      </div>
    </div>
  );
}

function CreateStoreForm({
  action,
  isPending,
}: {
  action: (formData: FormData) => void;
  isPending: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6">
          <Plus className="h-4 w-4 mr-2" />
          Create New Store
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Store</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div>
            <Label htmlFor="subdomain">Subdomain</Label>
            <Input
              id="subdomain"
              name="subdomain"
              placeholder="my-store"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Your store will be available at: my-store.{rootDomain}
            </p>
          </div>

          <div>
            <Label htmlFor="title">Store Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="My Amazing Store"
              required
            />
          </div>

          <div>
            <Label htmlFor="template">Template</Label>
            <select
              id="template"
              name="template_id"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {sampleTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name} - {template.description}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create Store"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function StoreGrid({
  stores,
  action,
  isPending,
}: {
  stores: Store[];
  action: (formData: FormData) => void;
  isPending: boolean;
}) {
  if (stores.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-gray-500">No stores have been created yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stores.map((store) => (
        <Card key={store.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{store.title}</CardTitle>
              <form action={action}>
                <input type="hidden" name="subdomain" value={store.subdomain} />
                <Button
                  variant="ghost"
                  size="icon"
                  type="submit"
                  disabled={isPending}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <strong>Subdomain:</strong> {store.subdomain}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Template:</strong> {store.template_id}
              </div>
              <div className="text-sm text-gray-500">
                Created: {new Date(store.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="mt-4">
              <a
                href={`${protocol}://${store.subdomain}.${rootDomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Visit store →
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AdminDashboard({ stores }: { stores: Store[] }) {
  const [deleteState, deleteAction, isDeletePending] = useActionState<
    DeleteState,
    FormData
  >(deleteSubdomainAction, {});

  const [createState, createAction, isCreatePending] = useActionState<
    CreateState,
    FormData
  >(createStoreAction, {});

  return (
    <div className="space-y-6 relative p-4 md:p-8">
      <DashboardHeader />
      <CreateStoreForm action={createAction} isPending={isCreatePending} />
      <StoreGrid
        stores={stores}
        action={deleteAction}
        isPending={isDeletePending}
      />

      {(deleteState.error || createState.error) && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md">
          {deleteState.error || createState.error}
        </div>
      )}

      {(deleteState.success || createState.success) && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md">
          {deleteState.success || createState.success}
        </div>
      )}
    </div>
  );
}
