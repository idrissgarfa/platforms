import { supabase, type Store, type Template } from "./supabase";

export function isValidIcon(str: string) {
  if (str.length > 10) {
    return false;
  }

  try {
    // Primary validation: Check if the string contains at least one emoji character
    // This regex pattern matches most emoji Unicode ranges
    const emojiPattern = /[\p{Emoji}]/u;
    if (emojiPattern.test(str)) {
      return true;
    }
  } catch (error) {
    // If the regex fails (e.g., in environments that don't support Unicode property escapes),
    // fall back to a simpler validation
    console.warn(
      "Emoji regex validation failed, using fallback validation",
      error
    );
  }

  // Fallback validation: Check if the string is within a reasonable length
  // This is less secure but better than no validation
  return str.length >= 1 && str.length <= 10;
}

export async function getStoreData(subdomain: string): Promise<Store | null> {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("subdomain", sanitizedSubdomain)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getTemplate(
  templateId: string
): Promise<Template | null> {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", templateId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getAllStores(): Promise<Store[]> {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data;
}

export async function createStore(
  subdomain: string,
  title: string,
  templateId: string
): Promise<Store | null> {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");

  const { data, error } = await supabase
    .from("stores")
    .insert({
      subdomain: sanitizedSubdomain,
      title,
      template_id: templateId,
    })
    .select()
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getAllTemplates(): Promise<Template[]> {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data;
}
