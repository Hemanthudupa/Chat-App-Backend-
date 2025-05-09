import { Music } from "./model";

export async function addMusicToDB(
  files: Express.Multer.File[],
  body: { [key: string]: string }
): Promise<{ [key: string]: any }> {
  const musicData = files.map((file) => {
    return {
      songUrl: file.path,
      songName: file.originalname,
      songArtist: body.songArtist,
      songDuration: body.songDuration,
      songImage: body.songImage,
    };
  });
  return await Music.bulkCreate(musicData);
}

export async function getAllMusics(): Promise<Music[]> {
  return await Music.findAll();
}
