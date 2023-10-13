import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

export async function updateFileClient(file: any) {
  const { error } = await supabase
    .from("print_files")
    .update(file)
    .match({ id: file.id })
  return error
}
