import {Injectable} from '@angular/core';
import {LOG_LVL_NAMES, LogLevel} from '../types/logger';
import {IUi2QpLogger} from '../interfaces/logger';
import {isEmpty} from '../helpers/empty-helper';

export const loggerFactory = (loggerLevel: LogLevel) => {
  return () => new Ui2QpLogger(loggerLevel);
};

@Injectable()
export class Ui2QpLogger implements IUi2QpLogger {

  /**
   * Default color palette used depending of the Logger level
   * @private
   */
  private colors = ['purple', 'teal', 'gray', 'orange', 'red'];

  /**
   * Creates a new Ui2QpLogger instance
   * @param logLevel Log level to print
   */
  constructor(private logLevel: LogLevel = LogLevel.Off) {
  }

  /**
   * Returns the line number and filename from where the logger service was called
   */
  static getCallerDetails(): { lineNumber: string, fileName: string } {
    const err = new Error('');
    try {
      // this should produce the line which NGX Logger was called
      const callerLine = err.stack.split('\n')[5].split('/');
      // returns the file:lineNumber
      const fileLineNumber = callerLine[callerLine.length - 1].replace(/[)]/g, '').split(':');

      return {
        fileName: fileLineNumber[0],
        lineNumber: fileLineNumber[1],
      };
    } catch (e) {
      return {
        fileName: null,
        lineNumber: null,
      };
    }

  }

  /**
   * String to be appended to the message in each of the logger calls. It contains the time, log level, filename and line number.
   * @param logLevel Log level to be appended to the string
   */
  static getMetaString(logLevel: string): string {
    const callerDetails = Ui2QpLogger.getCallerDetails();
    const datetime = new Date().toTimeString();
    const fileDetails = callerDetails.fileName ? ` [${callerDetails.fileName}:${callerDetails.lineNumber}]` : '';
    return `${logLevel} ${datetime}${fileDetails}`;
  }

  /**
   * Returns if a log should be printed or not.
   * @param logLevel Log level requested to be printed
   */
  private shouldBePrinted(logLevel: LogLevel): boolean {
    return this.logLevel !== LogLevel.Off && logLevel >= this.logLevel;
  }

  /**
   * It prints a log message in the console using the provided params
   * @param logLevel The log level to be used
   * @param message Log message to be print in the console
   * @param optionalParams Optional params to be print in the console
   */
  private log(logLevel: LogLevel, message: any, optionalParams: any[] = []) {
    const logLevelName = LOG_LVL_NAMES[logLevel];
    const color = this.colors[logLevel];
    const metaString = Ui2QpLogger.getMetaString(logLevelName);

    if (!isEmpty(optionalParams) && optionalParams.length > 1) {
      console.log(`%c${metaString}`, `color:${color}`, message);
      for (const optionalParam of optionalParams) {
        console.log(optionalParam);
      }
    } else {
      console.log(`%c${metaString}`, `color:${color}`, message, ...optionalParams);
    }
  }

  /**
   * Prints a trace level log
   * @param message Message to be printed in the console
   * @param optionalParams Optional params to be included in the log
   */
  public trace(message: any, ...optionalParams: any[]): void {
    if (this.shouldBePrinted(LogLevel.Trace)) {
      this.log(LogLevel.Trace, message, optionalParams);
    }
  }

  /**
   * Prints a debug level log
   * @param message Message to be printed in the console
   * @param optionalParams Optional params to be included in the log
   */
  public debug(message: any, ...optionalParams: any[]): void {
    if (this.shouldBePrinted(LogLevel.Debug)) {
      this.log(LogLevel.Debug, message, optionalParams);
    }
  }

  /**
   * Prints an info level log
   * @param message Message to be printed in the console
   * @param optionalParams Optional params to be included in the log
   */
  public info(message: any, ...optionalParams: any[]): void {
    if (this.shouldBePrinted(LogLevel.Info)) {
      this.log(LogLevel.Info, message, optionalParams);
    }
  }

  /**
   * Prints a warn level log
   * @param message Message to be printed in the console
   * @param optionalParams Optional params to be included in the log
   */
  public warn(message: any, optionalParams: any[]): void {
    if (this.shouldBePrinted(LogLevel.Warn)) {
      this.log(LogLevel.Warn, message, optionalParams);
    }
  }

  /**
   * Prints an error level log
   * @param message Message to be printed in the console
   * @param optionalParams Optional params to be included in the log
   */
  public error(message: any, optionalParams: any[]): void {
    if (this.shouldBePrinted(LogLevel.Error)) {
      this.log(LogLevel.Error, message, optionalParams);
    }
  }

}
