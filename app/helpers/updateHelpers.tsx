import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

export async function updateFileClient(file: any) {
  const { error } = await supabase
    .from("print_files")
    .update(file)
    .match({ id: file.id })
  return error
}

// For Insert Operations
export async function addFileClient(data: any) {
  const { error } = await supabase.from("print_files").insert(data)
  return error
}

// For Update Operations
export async function deleteFileClient(data: any) {
  const { error } = await supabase
    .from("print_files")
    .update(data)
    .eq("id", data.id)
  return error
}
