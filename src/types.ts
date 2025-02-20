import type { Stats } from 'node:fs'
import type { Theme } from '@inquirer/core'
import type { PartialDeep } from '@inquirer/type'

export type FileSelectorTheme = {
  prefix: {
    /**
     * The prefix to use for the idle status.
     * @default chalk.cyan('?')
     */
    idle: string
    /**
     * The prefix to use for the done status.
     * @default chalk.green(figures.tick)
     */
    done: string
    /**
     * The prefix to use for the canceled status.
     * @default chalk.red(figures.cross)
     */
    canceled: string
  }
  icon: {
    /**
     * The prefix to use for the line.
     * @default isLast => isLast ? └── : ├──
     */
    linePrefix: (isLast: boolean) => string
  }
  style: {
    /**
     * The style to use for the disabled items.
     * @default chalk.dim
     */
    disabled: (text: string) => string
    /**
     * The style to use for the active item.
     * @default chalk.cyan
     */
    active: (text: string) => string
    /**
     * The style to use for the cancel text.
     * @default chalk.red
     */
    cancelText: (text: string) => string
    /**
     * The style to use for the empty text.
     * @default chalk.red
     */
    emptyText: (text: string) => string
    /**
     * The style to use for items of type directory.
     * @default chalk.yellow
     */
    directory: (text: string) => string
    /**
     * The style to use for items of type file.
     * @default chalk.white
     */
    file: (text: string) => string
    /**
     * The style to use for the current directory header.
     * @default chalk.magenta
     */
    currentDir: (text: string) => string
    /**
     * The style to use for the message.
     * @default chalk.bold
     */
    message: (text: string, status: Status) => string
    /**
     * The style to use for the key bindings help.
     * @default chalk.white
     */
    help: (text: string) => string
    /**
     * The style to use for the keys in the key bindings help.
     * @default chalk.cyan
     */
    key: (text: string) => string
  }
}

export type FileStats = Stats & {
  /**
   * The name of the file or directory.
   */
  name: string
  /**
   * The path to the file or directory.
   */
  path: string
  /**
   * If the file or directory is disabled, it will be displayed in the list with the `disabledLabel` property.
   *
   * Set to `true` if the `filter` function returns `false`.
   */
  isDisabled: boolean
}

export type FileSelectorConfig = {
  message: string
  /**
   * The path to the directory where it will be started.
   * @default process.cwd()
   */
  basePath?: string
  /**
   * The type of elements that are valid selection options.
   * @default 'file'
   */
  type?: 'file' | 'directory' | 'file+directory'
  /**
   * The maximum number of items to display in the list.
   * @default 10
   */
  pageSize?: number
  /**
   * If `true`, the list will loop from the last item to the first item and vice versa.
   * @default false
   */
  loop?: boolean
  /**
   * A function to filter files and directories. It returns `true` to include the file or directory in the list,
   * and `false` to exclude it.
   *
   * If not provided, all files and directories will be included by default.
   */
  filter?: (file: FileStats) => boolean
  /**
   * If `true`, the list will include files and directories that are excluded by the `filter` function.
   * @default false
   */
  showExcluded?: boolean
  /**
   * The label to display when a file is disabled.
   * @default ' (not allowed)'
   */
  disabledLabel?: string
  /**
   * If true, the prompt will allow the user to cancel the selection.
   * @default false
   */
  allowCancel?: boolean
  /**
   * The message to display when the user cancels the selection.
   * @default 'Canceled.'
   */
  cancelText?: string
  /**
   * The message that will be displayed when the directory is empty.
   * @default 'Directory is empty.'
   */
  emptyText?: string
  /**
   * The theme to use for the file selector.
   */
  theme?: PartialDeep<Theme<FileSelectorTheme>>
}

/**
 * Internal types
 */

export type Status = 'idle' | 'done' | 'canceled'
