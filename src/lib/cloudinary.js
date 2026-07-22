// Direct, unsigned image upload to Cloudinary from the browser.
// Only the (public) cloud name + unsigned upload preset are needed —
// no API secret ships to the client.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export function isCloudinaryConfigured() {
  return Boolean(CLOUD_NAME && UPLOAD_PRESET);
}

export async function uploadImage(file) {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET."
    );
  }

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || "Image upload failed");
  }
  return data.secure_url; // the hosted image URL to store in the DB
}
