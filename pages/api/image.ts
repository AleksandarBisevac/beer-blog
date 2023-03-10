import { NextApiHandler } from "next";
import formidable from "formidable";
import cloudinary from "../../lib/cloudinary";
import { readFile } from "../../lib/utils/readFile";

//disabling body parser so we can handle parsing on our own
export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      return uploadNewImage(req, res);

    case "GET":
      return readAllImages(req, res);

    default:
      return res.status(404).send("Not Found");
  }
};

const uploadNewImage: NextApiHandler = async (req, res) => {
  try {
    const { files } = await readFile(req);
    const imageFile = files.image as formidable.File;
    const { secure_url: url } = await cloudinary.uploader.upload(
      imageFile.filepath,
      { folder: "beer_blog" }
    );

    res.json({ src: url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const readAllImages: NextApiHandler = async (req, res) => {
  try {
    const { resources } = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      prefix: "beer_blog",
    });

    const images = resources.map(({ secure_url }: any) => {
      return { src: secure_url };
    });
    res.json({ images });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export default handler;
