# API Reference

Complete reference for all FastCSV-ext classes, methods, and configuration options.

## FastCSVReader Class

The `FastCSVReader` class provides high-performance CSV reading capabilities with advanced navigation features.

### Constructor

```php
public function __construct(FastCSVConfig $config)
```

**Parameters:**
- `$config` - FastCSVConfig object with file path and reading options

**Example:**
```php
$config = new FastCSVConfig();
$config->setPath('data.csv');
$reader = new FastCSVReader($config);
```

### Methods

#### getHeaders()

```php
public function getHeaders(): array|false
```

Returns the header row (first row) of the CSV file.

**Returns:** Array of header column names, or `false` if no headers or file not found.

**Example:**
```php
$headers = $reader->getHeaders();
if ($headers !== false) {
    echo "Columns: " . implode(', ', $headers) . "\n";
}
```

#### nextRecord()

```php
public function nextRecord(): array|false
```

Reads the next record from the CSV file.

**Returns:** Array representing the next row, or `false` if no more records.

**Example:**
```php
while (($record = $reader->nextRecord()) !== false) {
    echo "Name: {$record[0]}, Email: {$record[1]}\n";
}
```

#### hasNext()

```php
public function hasNext(): bool
```

Checks if there are more records to read.

**Returns:** `true` if more records are available, `false` otherwise.

**Example:**
```php
while ($reader->hasNext()) {
    $record = $reader->nextRecord();
    // Process record
}
```

#### seek()

```php
public function seek(int $position): array|false
```

Seeks to a specific record position and returns that record.

**Parameters:**
- `$position` - Zero-based record position to seek to

**Returns:** Array representing the record at the specified position, or `false` if position is invalid.

**Example:**
```php
$record = $reader->seek(5); // Get 6th record (0-based)
if ($record !== false) {
    echo "Record 6: " . implode(', ', $record) . "\n";
}
```

#### getPosition()

```php
public function getPosition(): int
```

Returns the current record position.

**Returns:** Zero-based position of the current record.

**Example:**
```php
$position = $reader->getPosition();
echo "Current position: {$position}\n";
```

#### getRecordCount()

```php
public function getRecordCount(): int
```

Returns the total number of records in the CSV file.

**Returns:** Total number of records (excluding header if present).

**Example:**
```php
$count = $reader->getRecordCount();
echo "Total records: {$count}\n";
```

#### rewind()

```php
public function rewind(): void
```

Resets the reader to the beginning of the file.

**Example:**
```php
$reader->rewind(); // Start reading from the beginning
```

#### setConfig()

```php
public function setConfig(FastCSVConfig $config): bool
```

Updates the reader configuration and reopens the file.

**Parameters:**
- `$config` - New FastCSVConfig object

**Returns:** `true` on success, `false` on failure.

**Example:**
```php
$newConfig = new FastCSVConfig();
$newConfig->setPath('different-file.csv');
$reader->setConfig($newConfig);
```

#### close()

```php
public function close(): void
```

Closes the file handle and releases resources.

**Example:**
```php
$reader->close();
```

## FastCSVWriter Class

The `FastCSVWriter` class provides high-performance CSV writing capabilities.

### Constructor

```php
public function __construct(FastCSVConfig $config, array $headers)
```

**Parameters:**
- `$config` - FastCSVConfig object with file path and writing options
- `$headers` - Array of header column names

**Example:**
```php
$config = new FastCSVConfig();
$config->setPath('output.csv');
$writer = new FastCSVWriter($config, ['Name', 'Email', 'Age']);
```

### Methods

#### writeRecord()

```php
public function writeRecord(array $record): bool
```

Writes a single record to the CSV file.

**Parameters:**
- `$record` - Array of values to write

**Returns:** `true` on success, `false` on failure.

**Example:**
```php
$writer->writeRecord(['John Doe', 'john@example.com', 30]);
$writer->writeRecord(['Jane Smith', 'jane@example.com', 25]);
```

#### writeRecordMap()

```php
public function writeRecordMap(array $fieldsMap): bool
```

Writes a record using an associative array with field names.

**Parameters:**
- `$fieldsMap` - Associative array mapping field names to values

**Returns:** `true` on success, `false` on failure.

**Example:**
```php
$writer->writeRecordMap([
    'Name' => 'John Doe',
    'Email' => 'john@example.com',
    'Age' => 30
]);
```

#### flush()

```php
public function flush(): bool
```

Flushes any buffered data to the file.

**Returns:** `true` on success, `false` on failure.

**Example:**
```php
// Write many records
for ($i = 0; $i < 1000; $i++) {
    $writer->writeRecord([$i, "Data$i"]);
}

// Flush to ensure data is written
$writer->flush();
```

#### close()

```php
public function close(): void
```

Closes the file handle and flushes any remaining data.

**Important:** Always call `close()` when finished writing to ensure all data is written.

**Example:**
```php
$writer->close();
```

## FastCSVConfig Class

The `FastCSVConfig` class provides configuration options for CSV reading and writing.

### Constructor

```php
public function __construct()
```

Creates a new configuration with default values.

**Example:**
```php
$config = new FastCSVConfig();
```

### Configuration Methods

#### Delimiter Configuration

```php
public function getDelimiter(): string
public function setDelimiter(string $delimiter): self
```

**Default:** `,` (comma)

**Example:**
```php
$config->setDelimiter(';'); // Semicolon-separated values
$config->setDelimiter("\t"); // Tab-separated values
```

#### Enclosure Configuration

```php
public function getEnclosure(): string
public function setEnclosure(string $enclosure): self
```

**Default:** `"` (double quote)

**Example:**
```php
$config->setEnclosure("'"); // Single quote enclosure
```

#### Escape Configuration

```php
public function getEscape(): string
public function setEscape(string $escape): self
```

**Default:** `\` (backslash)

**Example:**
```php
$config->setEscape('\\'); // Backslash escape
```

#### File Path Configuration

```php
public function getPath(): string
public function setPath(string $path): self
```

**Example:**
```php
$config->setPath('/path/to/file.csv');
```

#### Offset Configuration

```php
public function getOffset(): int
public function setOffset(int $offset): self
```

**Default:** `0`

**Example:**
```php
$config->setOffset(5); // Skip first 5 lines
```

#### Header Configuration

```php
public function hasHeader(): bool
public function setHasHeader(bool $hasHeader): self
```

**Default:** `true`

**Example:**
```php
$config->setHasHeader(false); // No header row
```

#### Encoding Configuration

```php
public function getEncoding(): int
public function setEncoding(int $encoding): self
```

**Default:** `CSV_ENCODING_UTF8`

**Available encodings:**
- `CSV_ENCODING_UTF8` - UTF-8 encoding
- `CSV_ENCODING_UTF16LE` - UTF-16 Little Endian
- `CSV_ENCODING_UTF16BE` - UTF-16 Big Endian
- `CSV_ENCODING_UTF32LE` - UTF-32 Little Endian
- `CSV_ENCODING_UTF32BE` - UTF-32 Big Endian
- `CSV_ENCODING_ASCII` - ASCII encoding
- `CSV_ENCODING_LATIN1` - Latin-1 encoding

**Example:**
```php
$config->setEncoding(CSV_ENCODING_UTF16LE);
```

#### BOM Configuration

```php
public function getWriteBOM(): bool
public function setWriteBOM(bool $writeBOM): self
```

**Default:** `false`

**Example:**
```php
$config->setWriteBOM(true); // Write BOM for Unicode files
```

#### Strict Mode Configuration

```php
public function getStrictMode(): bool
public function setStrictMode(bool $strictMode): self
```

**Default:** `true`

**Example:**
```php
$config->setStrictMode(false); // Relaxed parsing
```

#### Empty Lines Configuration

```php
public function getSkipEmptyLines(): bool
public function setSkipEmptyLines(bool $skipEmptyLines): self
```

**Default:** `false`

**Example:**
```php
$config->setSkipEmptyLines(true); // Skip empty lines
```

#### Field Trimming Configuration

```php
public function getTrimFields(): bool
public function setTrimFields(bool $trimFields): self
```

**Default:** `false`

**Example:**
```php
$config->setTrimFields(true); // Trim whitespace from fields
```

#### Quote Preservation Configuration

```php
public function getPreserveQuotes(): bool
public function setPreserveQuotes(bool $preserveQuotes): self
```

**Default:** `false`

**Example:**
```php
$config->setPreserveQuotes(true); // Keep original quotes
```

#### Auto-Flush Configuration

```php
public function getAutoFlush(): bool
public function setAutoFlush(bool $autoFlush): self
```

**Default:** `true`

**Example:**
```php
$config->setAutoFlush(false); // Manual flush for performance
```

## Configuration Examples

### Custom Delimiters

```php
// Semicolon-separated values
$config = new FastCSVConfig();
$config->setPath('data.csv')
       ->setDelimiter(';');

// Tab-separated values
$config = new FastCSVConfig();
$config->setPath('data.tsv')
       ->setDelimiter("\t");

// Pipe-separated values
$config = new FastCSVConfig();
$config->setPath('data.csv')
       ->setDelimiter('|');
```

### Different Encodings

```php
// Read ISO-8859-1 encoded file
$config = new FastCSVConfig();
$config->setPath('latin1.csv')
       ->setEncoding(CSV_ENCODING_LATIN1);

// Write UTF-16 encoded file
$config = new FastCSVConfig();
$config->setPath('utf16.csv')
       ->setEncoding(CSV_ENCODING_UTF16LE)
       ->setWriteBOM(true);
```

### Performance Optimization

```php
// High-performance writing with manual flush
$config = new FastCSVConfig();
$config->setPath('large-output.csv')
       ->setAutoFlush(false);

$writer = new FastCSVWriter($config, ['ID', 'Data']);

for ($i = 0; $i < 100000; $i++) {
    $writer->writeRecord([$i, "Data$i"]);
    
    // Manual flush every 1000 records
    if ($i % 1000 == 0) {
        $writer->flush();
    }
}

$writer->close();
```

## Error Handling

FastCSV-ext throws standard PHP exceptions for different error conditions:

```php
try {
    $config = new FastCSVConfig();
    $config->setPath('nonexistent.csv');
    $reader = new FastCSVReader($config);
    
    while ($reader->hasNext()) {
        $record = $reader->nextRecord();
        // Process record
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
```

## Performance Considerations

- Use `setAutoFlush(false)` for bulk operations and call `flush()` manually
- Always call `close()` on writers to ensure data is flushed
- Use `seek()` for random access to specific records
- Configure appropriate delimiters to avoid parsing ambiguity
- Use `setSkipEmptyLines(true)` to ignore empty lines during reading

## Version Information

Check the installed version of FastCSV-ext:

```php
echo phpversion('fastcsv');
```

Get detailed extension information:

```php
phpinfo(INFO_MODULES); // Look for fastcsv section
```