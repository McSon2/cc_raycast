import { Action, ActionPanel, List, showToast, Toast, open, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { getProjects, Project } from "./utils/storage";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export default function OpenProject() {
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

  async function openInCursor(project: Project) {
    try {
      await open(project.path, "Cursor");
      await showToast({
        style: Toast.Style.Success,
        title: "Opened in Cursor",
        message: project.name,
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to open Cursor",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async function openInTerminal(project: Project) {
    try {
      let command = "";

      switch (project.terminal) {
        case "ghostty":
          // Ghostty: ouvre l'app, active-la puis envoie les commandes
          command = `open -na Ghostty && sleep 0.5 && osascript -e 'tell application "Ghostty" to activate' -e 'delay 0.3' -e 'tell application "System Events" to keystroke "cd ${project.path.replace(/"/g, '\\"')} && cc"' -e 'tell application "System Events" to keystroke return'`;
          break;
        case "iterm":
          command = `osascript -e 'tell application "iTerm"
            create window with default profile
            tell current session of current window
              write text "cd '${project.path}' && cc"
            end tell
          end tell'`;
          break;
        case "terminal":
          command = `osascript -e 'tell application "Terminal"
            do script "cd '${project.path}' && cc"
            activate
          end tell'`;
          break;
      }

      await execAsync(command);
      await showToast({
        style: Toast.Style.Success,
        title: `Opened in ${project.terminal}`,
        message: `${project.name} with Claude Code`,
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to open terminal",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async function openBoth(project: Project) {
    await openInCursor(project);
    await openInTerminal(project);
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
            accessories={[{ text: project.terminal }]}
            actions={
              <ActionPanel>
                <Action title="Open Both" onAction={() => openBoth(project)} icon={Icon.RocketLaunch} />
                <Action title="Open in Cursor Only" onAction={() => openInCursor(project)} icon={Icon.Code} />
                <Action
                  title="Open in Terminal + Claude Code"
                  onAction={() => openInTerminal(project)}
                  icon={Icon.Terminal}
                />
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}
