import { Action, ActionPanel, Form, showToast, Toast, popToRoot } from "@raycast/api";
import { useState } from "react";
import { addProject } from "./utils/storage";

export default function AddProject() {
  const [name, setName] = useState("");
  const [paths, setPaths] = useState<string[]>([]);
  const [terminal, setTerminal] = useState<"ghostty" | "iterm" | "terminal">("ghostty");

  async function handleSubmit() {
    const path = paths[0];
    if (!name || !path) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Missing fields",
        message: "Please fill in all required fields",
      });
      return;
    }

    try {
      await addProject({ name, path, terminal });
      await showToast({
        style: Toast.Style.Success,
        title: "Project added",
        message: `${name} has been added successfully`,
      });
      await popToRoot();
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to add project",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Project" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="name"
        title="Project Name"
        placeholder="My Awesome Project"
        value={name}
        onChange={setName}
      />
      <Form.FilePicker
        id="path"
        title="Project Path"
        allowMultipleSelection={false}
        canChooseDirectories
        canChooseFiles={false}
        value={paths}
        onChange={setPaths}
      />
      <Form.Dropdown id="terminal" title="Terminal" value={terminal} onChange={(v) => setTerminal(v as any)}>
        <Form.Dropdown.Item value="ghostty" title="Ghostty" />
        <Form.Dropdown.Item value="iterm" title="iTerm" />
        <Form.Dropdown.Item value="terminal" title="Terminal" />
      </Form.Dropdown>
    </Form>
  );
}
