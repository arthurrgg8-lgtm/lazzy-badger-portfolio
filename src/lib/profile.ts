import profileData from "@/data/profile.json";

export type Project = {
  name: string;
  description: string;
  status?: string;
  repository?: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  label: string;
};

export type Profile = typeof profileData & {
  projects: Project[];
  pillars: string[];
  gallery: GalleryItem[];
};

export const profile = profileData as Profile;
export const gallery = profile.gallery;
export const pillars = profile.pillars;
