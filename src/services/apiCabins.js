import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  // this function returns a promise and when the promise is resolved it will return the data (at the bottom)
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  // this data is stored in the cache
  return data;
}

export async function createEditCabin(newCabin, id) {

    // checks if new cabin starts with superbaseUrl? if it does, then it already has an image path that we want to keep. we dont want to create a new one, but use the current path
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    
    // creating unique URL and replacing any "/"
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  //  creating image path, if it has an image then use that one else create a new image path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin

 //  Refactoring the query
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT (got code from superbase API docs)
  if (id)
    // we only want to update the info similar to when we created the cabin and only if the id's match. (also not in an array). 
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();
//

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
