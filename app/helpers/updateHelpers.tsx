import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()
const timestamp = new Date().toISOString()
import fs from "fs"

// For Update Operations
export async function updateModelClient(model: any) {
  const { error } = await supabase
    .from("models")
    .update(model)
    .match({ id: model.id })
  return error
}

// For Insert Operations
export const addModelClient = async (data: any) => {
  try {
    const model = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      type: data.type,
      license: data.license,
      url: data.url,
      user_id: data.userId,
    }

    const { data: insertedData, error } = await supabase
      .from("models")
      .insert(model)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addModelClient:", error)
    return { data: null, error }
  }
}

// For Delete Operations
export async function deleteModelClient(data: any) {
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
    console.error("Error in deleteModelClient:", error)
    return { error, data: null }
  }
}

export async function deleteModelTags(data: any) {
  try {
    const { error } = await supabase
      .from("model_tags")
      .delete(data)
      .match({ model_id: data.id })

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteModelClient:", error)
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

// ------Project Models
// Insert
export const addProjectModelsClient = async (data: any) => {
  try {
    const projectModel = {
      id: data.id,
      model_id: data.modelId,
      project_id: data.projectId,
    }

    const { data: insertedData, error } = await supabase
      .from("project_models")
      .insert(projectModel)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addProjectModelsClient:", error)
    return { data: null, error }
  }
}

// Delete
export async function deleteProjectModelsClient(data: any) {
  // Filter project_models table by matching project_id & model_id,
  // and return id of matching single model

  try {
    const { error } = await supabase
      .from("project_models")
      .delete(data)
      .match({ id: data.id })

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteProjectModelClient:", error)
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
    console.error("Error in addProjectModelsClient:", error)
    return { data: null, error }
  }
}

// Insert
export const updateModelTags = async (data: any) => {
  try {
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
  activeModel: any,
  imageData: any
) => {
  try {
    const timestamp = new Date().getTime()
    const modelpath = `public/${activeUser}/model_${activeModel}_${timestamp}.jpg`
    const model = imageData.target.files[0]

    const { data, error } = await supabase.storage
      .from("images")
      .upload(modelpath, model, {
        contentType: "image/jpeg",
      })

    // Retrieve the image path
    const { data: imagePathData } = await supabase.storage
      .from("images")
      .getPublicUrl(modelpath)
    const imagePath = imagePathData.publicUrl

    // Make an entry in the model_images table when the image is uploaded successfully
    const modelImage = {
      model_id: activeModel,
      href: imagePath,
    }

    const { error: insertError } = await supabase
      .from("images")
      .insert(modelImage)
      .single()

    if (insertError) {
      console.error("Error inserting data:", insertError)
      return { error: insertError, data: null }
    }
  } catch (error) {
    console.error("Error in ImageUpload:", error)
    return { error, data: null }
  }
}

export async function deleteImage(data: any, activeUser: any) {
  try {
    const modelName = data.href.split("/").pop()

    const { error: imageStorageError } = await supabase.storage
      .from("images")
      .remove(["public/" + activeUser[0].id + "/" + modelName])

    if (imageStorageError) {
      console.error("Error deleting data:", imageStorageError)
      return { imageStorageError, data: null }
    }

    const { error: imageTableError } = await supabase
      .from("images")
      .delete()
      .eq("id", data.id)

    if (imageTableError) {
      console.error("Error deleting data:", imageTableError)
      return { imageTableError, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteImage:", error)
    return { error, data: null }
  }
}

// Print Jobs
export const addPrintJob = async (data: any) => {
  try {
    const printJob = {
      id: crypto.randomUUID(),
      date: data.date,
      printer: data.printer,
      status: data.status,
      material_type: data.material_type,
      duration: data.duration,
      comments: data.comments,
      // resin: data.resin,
      // filament: data.filament,
      model_id: data.model_id,
      fail_comment: data.fail_comment,
    }

    const { data: insertedData, error } = await supabase
      .from("print_jobs")
      .insert(printJob)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addPrintJob:", error)
    return { data: null, error }
  }
}

const getFileExtension = (href: string): string => {
  return href.match(/\.(\w{3})(?=\?|$)/)?.[1] ?? ""
}

// File Upload
export const uploadFile = async (
  activeUser: any,
  activeModel: any,
  fileData: any
) => {
  try {
    const timestamp = new Date().getTime()
    const file = fileData.target.files[0]
    const extension = getFileExtension(file.name)

    const modelpath = `public/${activeUser}/model_${activeModel}_${timestamp}.${extension}`

    const { data, error } = await supabase.storage
      .from("files")
      .upload(modelpath, file)

    // // Retrieve the image path
    const { data: filePathData } = await supabase.storage
      .from("files")
      .getPublicUrl(modelpath)
    const filePath = filePathData.publicUrl

    // Make an entry in the model_images table when the image is uploaded successfully
    const modelFile = {
      model_id: activeModel,
      href: filePath,
    }

    const { error: insertError } = await supabase
      .from("model_files")
      .insert(modelFile)
      .single()

    if (insertError) {
      console.error("Error inserting data:", insertError)
      return { error: insertError, data: null }
    }
  } catch (error) {
    console.error("Error in FileUpload:", error)
    return { error, data: null }
  }
}

export async function deleteFile(data: any, activeUser: any) {
  try {
    const fileName = data.href.split("/").pop()

    const { error: fileStorageError } = await supabase.storage
      .from("files")
      .remove(["public/" + activeUser[0].id + "/" + fileName])

    if (fileStorageError) {
      console.error("Error deleting data:", fileStorageError)
      return { fileStorageError, data: null }
    }

    const { error: fileTableError } = await supabase
      .from("model_files")
      .delete()
      .eq("id", data.id)

    if (fileTableError) {
      console.error("Error deleting data:", fileTableError)
      return { fileTableError, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteFile:", error)
    return { error, data: null }
  }
}

export async function updatePrintJob(job: any) {
  try {
    const { error } = await supabase
      .from("print_jobs")
      .update(job)
      .eq("id", job.id)

    return { error, data: null }
  } catch (error) {
    console.error("Error in updatePrintJob:", error)

    return { error, data: null }
  }
}

export async function deletePrintJob(data: any) {
  try {
    const { error } = await supabase
      .from("print_jobs")
      .delete()
      .match({ id: data.id })

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deletePrintJob:", error)
    return { error, data: null }
  }
}
