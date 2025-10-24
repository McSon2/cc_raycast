/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `add-project` command */
  export type AddProject = ExtensionPreferences & {}
  /** Preferences accessible in the `open-project` command */
  export type OpenProject = ExtensionPreferences & {}
  /** Preferences accessible in the `list-projects` command */
  export type ListProjects = ExtensionPreferences & {}
  /** Preferences accessible in the `edit-project` command */
  export type EditProject = ExtensionPreferences & {}
  /** Preferences accessible in the `delete-project` command */
  export type DeleteProject = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `add-project` command */
  export type AddProject = {}
  /** Arguments passed to the `open-project` command */
  export type OpenProject = {}
  /** Arguments passed to the `list-projects` command */
  export type ListProjects = {}
  /** Arguments passed to the `edit-project` command */
  export type EditProject = {}
  /** Arguments passed to the `delete-project` command */
  export type DeleteProject = {}
}

