"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { rootDomain, protocol } from "@/lib/utils";

export async function createStoreAction(prevState: any, formData: FormData) {
  const subdomain = formData.get("subdomain") as string;
  const title = formData.get("title") as string;
  const template_id = formData.get("template_id") as string;

  if (!subdomain || !title || !template_id) {
    return {
      error: "Subdomain, title, and template are required",
    };
  }

  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");

  if (sanitizedSubdomain !== subdomain) {
    return {
      subdomain,
      title,
      template_id,
      error:
        "Subdomain can only have lowercase letters, numbers, and hyphens. Please try again.",
    };
  }

  // Check if subdomain already exists
  const { data: existingStore } = await supabase
    .from("stores")
    .select("id")
    .eq("subdomain", sanitizedSubdomain)
    .single();

  if (existingStore) {
    return {
      subdomain,
      title,
      template_id,
      error: "This subdomain is already taken",
    };
  }

  // Create the store
  const { data, error } = await supabase
    .from("stores")
    .insert({
      subdomain: sanitizedSubdomain,
      title,
      template_id,
    })
    .select()
    .single();

  if (error) {
    return {
      subdomain,
      title,
      template_id,
      error: "Failed to create store. Please try again.",
    };
  }

  revalidatePath("/admin");
  redirect(`${protocol}://${sanitizedSubdomain}.${rootDomain}`);
}

export async function deleteSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get("subdomain") as string;

  const { error } = await supabase
    .from("stores")
    .delete()
    .eq("subdomain", subdomain);

  if (error) {
    return { error: "Failed to delete store" };
  }

  revalidatePath("/admin");
  return { success: "Store deleted successfully" };
}
