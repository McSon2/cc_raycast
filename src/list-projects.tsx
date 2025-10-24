import { List, showToast, Toast, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { getProjects, Project } from "./utils/storage";

export default function ListProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to load projects",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search projects...">
      {projects.length === 0 ? (
        <List.EmptyView
          icon={Icon.Folder}
          title="No projects yet"
          description="Use 'Add Project' to add your first project"
        />
      ) : (
        projects.map((project) => (
          <List.Item
            key={project.id}
            title={project.name}
            subtitle={project.path}
            accessories={[
              ...(project.workspaceFile ? [{ icon: Icon.Document, tooltip: "Has workspace" }] : []),
              { tag: { value: project.terminal, color: "#007AFF" } },
              { text: `ID: ${project.id}` }
            ]}
            icon={Icon.Folder}
          />
        ))
      )}
    </List>
  );
}
