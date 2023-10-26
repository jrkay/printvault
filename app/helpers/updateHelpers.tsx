import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()
const timestamp = new Date().toISOString()
import fs from "fs"

// For Update Operations
export async function updateFileClient(file: any) {
  const { error } = await supabase
    .from("models")
    .update(file)
    .match({ id: file.id })
  return error
}

// For Insert Operations
export const addFileClient = async (data: any) => {
  try {
    const file = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      type: data.type,
      tags: data.tags,
      license: data.license,
      url: data.url,
      user_id: data.userId,
    }

    const { data: insertedData, error } = await supabase
      .from("models")
      .insert(file)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addFileClient:", error)
    return { data: null, error }
  }
}

// For Delete Operations
export async function deleteFileClient(data: any) {
  try {
    const { error } = await supabase
      .from("models")
      .delete(data)
      .eq("id", data.id.toString())

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteFileClient:", error)
    return { error, data: null }
  }
}

// ----Projects----
// For Update Operations
export async function updateProjectClient(project: any) {
  try {
    const { error } = await supabase
      .from("projects")
      .update(project)
      .eq("id", project.id)

    return { error, data: null }
  } catch (error) {
    console.error("Error in updateProjectClient:", error)

    return { error, data: null }
  }
}

// For Insert Operations
export const addProjectClient = async (data: any) => {
  try {
    const project = {
      id: data.id,
      name: data.name,
      description: data.description,
      start_date: timestamp,
      status: data.status,
      comments: data.comments,
      user_id: data.userId,
    }

    const { data: insertedData, error } = await supabase
      .from("projects")
      .insert(project)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addProjectClient:", error)
    return { data: null, error }
  }
}

// For Delete Operations
export async function deleteProjectClient(data: any) {
  try {
    const { error } = await supabase
      .from("projects")
      .delete(data)
      .eq("id", data.id.toString())

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteProjectClient:", error)
    return { error, data: null }
  }
}

// ------Project Files
// Insert
export const addProjectFilesClient = async (data: any) => {
  try {
    const projectFile = {
      id: data.id,
      model_id: data.fileId,
      project_id: data.projectId,
    }

    const { data: insertedData, error } = await supabase
      .from("project_files")
      .insert(projectFile)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addProjectFilesClient:", error)
    return { data: null, error }
  }
}

// Delete
export async function deleteProjectFilesClient(data: any) {
  // Filter project_files table by matching project_id & model_id,
  // and return id of matching single file

  try {
    const { error } = await supabase
      .from("project_files")
      .delete(data)
      .match({ id: data.id })
    //  .eq("id", data.id)

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteProjectFileClient:", error)
    return { error, data: null }
  }
}

// ------Model Tags
// Insert
export const addModelTags = async (data: any) => {
  try {
    const modelTags = {
      model_id: data.id,
      tag_id: data.tags,
    }

    const { data: insertedData, error } = await supabase
      .from("model_tags")
      .insert(modelTags)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addProjectFilesClient:", error)
    return { data: null, error }
  }
}

// Insert
export const updateModelTags = async (data: any) => {
  try {
    console.log("data - update Helpers -------- ", data)
    const { error } = await supabase.from("tags").update(data).eq("id", data.id)

    return { error, data: null }
  } catch (error) {
    console.error("Error in updateProjectClient:", error)

    return { error, data: null }
  }
}

// Image Upload
export const uploadImage = async (
  activeUser: any,
  activeFile: any,
  imageData: any
) => {
  try {
    const timestamp = new Date().getTime()
    const filepath = `public/${activeUser}/model_${activeFile}_${timestamp}.jpg`
    const file = imageData.target.files[0]

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filepath, file, {
        contentType: "image/jpeg",
      })
  } catch (error) {
    console.error("Error in ImageUpload:", error)
    return { error, data: null }
  }
}
