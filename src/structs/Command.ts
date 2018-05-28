export default abstract class Command {
    abstract name: string;
    abstract desc: string;
    abstract usage: string;

    abstract async execute(): Promise<void>;
}