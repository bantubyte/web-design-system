import {
	type ChangeEvent,
	type DragEvent,
	type HTMLAttributes,
	type ReactNode,
	useId,
	useState,
} from 'react';
import { cx } from '../utils/class-names';
import { Button } from './button';

export interface FileDropzoneProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	accept?: string;
	description?: ReactNode;
	file?: File | null;
	maxSizeMb?: number;
	onFileChange?: (file: File | null) => void;
	title?: ReactNode;
}

const formatFileSize = (bytes: number): string => {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function FileDropzone({
	accept,
	className,
	description = 'Drag and drop a file here, or choose one from disk.',
	file,
	maxSizeMb = 10,
	onFileChange,
	title = 'Upload file',
	...props
}: FileDropzoneProps) {
	const inputId = useId();
	const [uncontrolledFile, setUncontrolledFile] = useState<File | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const activeFile = file ?? uncontrolledFile;

	const setFile = (nextFile: File | null) => {
		if (file === undefined) {
			setUncontrolledFile(nextFile);
		}
		onFileChange?.(nextFile);
	};

	const validateAndSetFile = (nextFile?: File) => {
		setError(null);
		if (!nextFile) {
			setFile(null);
			return;
		}

		const maxSizeBytes = maxSizeMb * 1024 * 1024;
		if (nextFile.size > maxSizeBytes) {
			setError(`File must be ${maxSizeMb}MB or smaller.`);
			setFile(null);
			return;
		}

		setFile(nextFile);
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		validateAndSetFile(event.target.files?.[0]);
	};

	const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
		setIsDragging(false);
		validateAndSetFile(event.dataTransfer.files[0]);
	};

	return (
		<div className={cx('pds-file-dropzone', className)} {...props}>
			<label
				className={cx(
					'pds-file-dropzone__target',
					isDragging && 'pds-file-dropzone__target--dragging',
					error && 'pds-file-dropzone__target--error',
				)}
				htmlFor={inputId}
				onDragEnter={() => setIsDragging(true)}
				onDragLeave={() => setIsDragging(false)}
				onDragOver={(event) => event.preventDefault()}
				onDrop={handleDrop}
			>
				<input
					accept={accept}
					id={inputId}
					onChange={handleInputChange}
					type="file"
				/>
				<span aria-hidden="true" className="pds-file-dropzone__icon">
					↑
				</span>
				<span className="pds-file-dropzone__copy">
					<strong>{activeFile ? activeFile.name : title}</strong>
					<small>
						{activeFile
							? `${formatFileSize(activeFile.size)} selected`
							: description}
					</small>
				</span>
			</label>
			<div className="pds-file-dropzone__footer">
				<span>{error ?? `Max ${maxSizeMb}MB`}</span>
				{activeFile ? (
					<Button
						onClick={() => validateAndSetFile(undefined)}
						size="sm"
						variant="ghost"
					>
						Remove
					</Button>
				) : null}
			</div>
		</div>
	);
}
