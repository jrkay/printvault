import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function updateModel(model: any) {
  const supabase = createClientComponentClient()
  const { error } = await supabase
    .from("models")
    .update(model)
    .match({ id: model.id })
  return error
}
