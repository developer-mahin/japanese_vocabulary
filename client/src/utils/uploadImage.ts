/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
export const imageUploadIntoImgbb = (formData: any) => {
  const url = `https://api.imgbb.com/1/upload?key=e6715828d226108de92f2bc703211a4e`;

  const image = fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((imageData) => {
      return imageData.data.display_url;
    })
    .catch(() => {
      toast.error("Image not upload please try again");
    });

  return image;
};
