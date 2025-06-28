# API Reference

Complete reference for all CSV Toolkit classes, methods, and configuration options.

## Factory Classes

### ReaderFactory

The `ReaderFactory` class provides methods for creating CSV readers with automatic implementation selection.

```php
use CsvToolkit\Factories\ReaderFactory;
```

#### Static Methods

##### create()

```php
public static function create(
    ?string $source = null,
    CsvConfig|SplConfig|null $config = null
): CsvReaderInterface
```

Creates a CSV reader using the best available implementation (FastCSV if available, SplFileObject as fallback).

**Parameters:**
- `$source` - Optional path to the CSV file
- `$config` - Optional configuration object

**Returns:** `CsvReaderInterface` implementation

**Example:**
```php
$reader = ReaderFactory::create('data.csv');
$reader = ReaderFactory::create('data.csv', new CsvConfig());
```

##### createFastCsv()

```php
public static function createFastCsv(
    ?string $source = null,
    CsvConfig|SplConfig|null $config = null
): CsvReader
```

Creates a CSV reader using the FastCSV extension (throws exception if not available).

##### createSpl()

```php
public static function createSpl(
    ?string $source = null,
    ?SplConfig $config = null
): SplCsvReader
```

Creates a CSV reader using SplFileObject (always available).

### WriterFactory

The `WriterFactory` class provides methods for creating CSV writers with automatic implementation selection.

```php
use CsvToolkit\Factories\WriterFactory;
```

#### Static Methods

##### create()

```php
public static function create(
    string $destination,
    CsvConfig|SplConfig|null $config = null
): CsvWriterInterface
```

Creates a CSV writer using the best available implementation.

**Parameters:**
- `$destination` - File path to write to
- `$config` - Optional configuration object

**Returns:** `CsvWriterInterface` implementation

##### createFastCsv()

```php
public static function createFastCsv(
    string $destination,
    CsvConfig|SplConfig|null $config = null
): CsvWriter
```

Creates a CSV writer using the FastCSV extension.

##### createSpl()

```php
public static function createSpl(
    string $destination,
    ?SplConfig $config = null
): SplCsvWriter
```

Creates a CSV writer using SplFileObject.

## Reader Classes

### CsvReader (FastCSV Implementation)

High-performance CSV reader using the FastCSV extension.

```php
use CsvToolkit\Readers\CsvReader;
```

#### Constructor

```php
public function __construct(
    ?string $source = null,
    ?CsvConfig $config = null
)
```

#### Methods

##### nextRecord()

```php
public function nextRecord(): array|false
```

Reads the next record sequentially.

**Returns:** Array of field values, or false if end of file.

##### seek()

```php
public function seek(int $position): array|false
```

Seeks to a specific 0-based record position.

**Parameters:**
- `$position` - Zero-based position to seek to

**Returns:** Array of field values at the position, or false if invalid position.

##### getRecord()

```php
public function getRecord(?int $position = null): array|false
```

Gets the record at the current position without advancing.

##### rewind()

```php
public function rewind(): void
```

Rewinds the reader to the beginning of the data records.

##### getCurrentPosition()

```php
public function getCurrentPosition(): int
```

Gets the current 0-based record position (-1 if no record has been read).

##### hasNext()

```php
public function hasNext(): bool
```

Checks if more records exist from the current position.

##### hasRecords()

```php
public function hasRecords(): bool
```

Checks if the CSV file contains any data records.

##### getHeader()

```php
public function getHeader(): array|false
```

Gets the header row if headers are enabled.

##### getRecordCount()

```php
public function getRecordCount(): ?int
```

Gets the total number of data records in the CSV file.

### SplCsvReader (SplFileObject Implementation)

Fallback CSV reader using PHP's built-in SplFileObject.

```php
use CsvToolkit\Readers\SplCsvReader;
```

Implements the same interface as `CsvReader` with identical method signatures.

## Writer Classes

### CsvWriter (FastCSV Implementation)

High-performance CSV writer using the FastCSV extension.

```php
use CsvToolkit\Writers\CsvWriter;
```

#### Constructor

```php
public function __construct(
    ?string $destination = null,
    ?CsvConfig $config = null
)
```

#### Methods

##### write()

```php
public function write(array $data): void
```

Writes a single record to the CSV file.

**Parameters:**
- `$data` - Array of field values to write

##### writeAll()

```php
public function writeAll(array $records): void
```

Writes multiple records to the CSV file.

**Parameters:**
- `$records` - Array of arrays, where each sub-array is a record

##### setHeaders()

```php
public function setHeaders(array $headers): void
```

Sets the CSV headers.

##### getHeaders()

```php
public function getHeaders(): ?array
```

Gets the CSV headers.

##### flush()

```php
public function flush(): bool
```

Manually flushes buffered data to disk.

**Returns:** True on success, false on failure.

##### close()

```php
public function close(): void
```

Closes the writer and frees resources.

### SplCsvWriter (SplFileObject Implementation)

Fallback CSV writer using PHP's built-in SplFileObject.

```php
use CsvToolkit\Writers\SplCsvWriter;
```

Implements the same interface as `CsvWriter` with identical method signatures.

## Configuration Classes

### CsvConfig (FastCSV Configuration)

Configuration class for FastCSV extension with advanced features.

```php
use CsvToolkit\Configs\CsvConfig;
```

#### Constructor

```php
public function __construct(?string $path = null, bool $hasHeader = true)
```

#### Methods

##### Basic CSV Settings

```php
public function getDelimiter(): string
public function setDelimiter(string $delimiter): self

public function getEnclosure(): string
public function setEnclosure(string $enclosure): self

public function getEscape(): string
public function setEscape(string $escape): self

public function hasHeader(): bool
public function setHasHeader(bool $hasHeader): self
```

##### Advanced Settings

```php
public function getEncoding(): int
public function setEncoding(Encoding|int $encoding): self

public function getWriteBOM(): bool
public function setWriteBOM(bool $writeBOM): self

public function getStrictMode(): bool
public function setStrictMode(bool $strictMode): self

public function getSkipEmptyLines(): bool
public function setSkipEmptyLines(bool $skipEmptyLines): self

public function getTrimFields(): bool
public function setTrimFields(bool $trimFields): self

public function getPreserveQuotes(): bool
public function setPreserveQuotes(bool $preserveQuotes): self

public function getAutoFlush(): bool
public function setAutoFlush(bool $autoFlush): self
```

##### File Settings

```php
public function getPath(): string
public function setPath(string $path): self

public function getOffset(): int
public function setOffset(int $offset): self
```

### SplConfig (SplFileObject Configuration)

Configuration class for SplFileObject-based operations.

```php
use CsvToolkit\Configs\SplConfig;
```

Provides the same basic CSV configuration methods as `CsvConfig`, but without advanced features like encoding or BOM handling.

## Helper Classes

### ExtensionHelper

Utility class for checking extension availability and capabilities.

```php
use CsvToolkit\Helpers\ExtensionHelper;
```

#### Static Methods

##### isFastCsvLoaded()

```php
public static function isFastCsvLoaded(): bool
```

Checks if the FastCSV extension is loaded.

##### getBestImplementation()

```php
public static function getBestImplementation(): string
```

Determines the best available CSV implementation ('fastcsv' or 'spl').

##### getFastCsvInfo()

```php
public static function getFastCsvInfo(): array
```

Gets detailed information about the FastCSV extension.

**Returns:**
```php
[
    'loaded' => bool,
    'version' => string|null,
    'available_classes' => array<string>
]
```

##### getExtensionInfo()

```php
public static function getExtensionInfo(): array
```

Gets information about all available CSV extensions.

## Enums

### Encoding

Enumeration for supported character encodings.

```php
use CsvToolkit\Enums\Encoding;
```

#### Values

- `Encoding::UTF8` - UTF-8 encoding (default)
- `Encoding::UTF16` - UTF-16 encoding
- `Encoding::UTF16LE` - UTF-16 Little Endian
- `Encoding::UTF16BE` - UTF-16 Big Endian
- `Encoding::LATIN1` - ISO-8859-1 encoding
- `Encoding::ASCII` - ASCII encoding

## Exception Classes

### FileNotFoundException

```php
use CsvToolkit\Exceptions\FileNotFoundException;
```

Thrown when a specified CSV file cannot be found.

### FileNotReadableException

```php
use CsvToolkit\Exceptions\FileNotReadableException;
```

Thrown when a CSV file exists but cannot be read due to permissions.

### FileNotWritableException

```php
use CsvToolkit\Exceptions\FileNotWritableException;
```

Thrown when a CSV file cannot be written to due to permissions or disk space.

### EmptyFileException

```php
use CsvToolkit\Exceptions\EmptyFileException;
```

Thrown when attempting to read from an empty CSV file.

### CsvReaderException

```php
use CsvToolkit\Exceptions\CsvReaderException;
```

General exception for CSV reading errors.

### CsvWriterException

```php
use CsvToolkit\Exceptions\CsvWriterException;
```

General exception for CSV writing errors.

### DirectoryNotFoundException

```php
use CsvToolkit\Exceptions\DirectoryNotFoundException;
```

Thrown when attempting to write to a non-existent directory.

### InvalidConfigurationException

```php
use CsvToolkit\Exceptions\InvalidConfigurationException;
```

Thrown when invalid configuration options are provided.

## Usage Examples

### Basic Reading

```php
use CsvToolkit\Factories\ReaderFactory;

$reader = ReaderFactory::create('data.csv');
while (($record = $reader->nextRecord()) !== false) {
    print_r($record);
}
```

### Advanced Configuration

```php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Configs\CsvConfig;
use CsvToolkit\Enums\Encoding;

$config = new CsvConfig();
$config->setDelimiter(';')
       ->setEnclosure('"')
       ->setEncoding(Encoding::UTF16)
       ->setHasHeader(true)
       ->setStrictMode(true)
       ->setTrimFields(true);

$reader = ReaderFactory::create('data.csv', $config);
```

### Bulk Writing with Performance Optimization

```php
use CsvToolkit\Factories\WriterFactory;
use CsvToolkit\Configs\CsvConfig;

$config = new CsvConfig();
$config->setAutoFlush(false); // Better performance for bulk operations

$writer = WriterFactory::create('output.csv', $config);

// Write many records
for ($i = 0; $i < 10000; $i++) {
    $writer->write(["Record $i", "data$i@example.com"]);
    
    // Flush periodically
    if ($i % 1000 === 0) {
        $writer->flush();
    }
}

$writer->flush(); // Final flush
$writer->close();
```

### Error Handling

```php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Exceptions\FileNotFoundException;
use CsvToolkit\Exceptions\CsvReaderException;

try {
    $reader = ReaderFactory::create('data.csv');
    while (($record = $reader->nextRecord()) !== false) {
        // Process record
    }
} catch (FileNotFoundException $e) {
    echo "File not found: " . $e->getMessage();
} catch (CsvReaderException $e) {
    echo "CSV error: " . $e->getMessage();
}
```