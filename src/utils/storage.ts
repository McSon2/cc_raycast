import { LocalStorage } from "@raycast/api";

export interface Project {
  id: string;
  name: string;
  path: string;
  terminal: "ghostty" | "iterm" | "terminal";
}

const STORAGE_KEY = "projects";

export async function getProjects(): Promise<Project[]> {
  const data = await LocalStorage.getItem<string>(STORAGE_KEY);
  if (!data) {
    return [];
  }
  return JSON.parse(data);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await LocalStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export async function addProject(project: Omit<Project, "id">): Promise<void> {
  const projects = await getProjects();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
  };
  projects.push(newProject);
  await saveProjects(projects);
}

export async function deleteProject(id: string): Promise<void> {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  await saveProjects(filtered);
}
