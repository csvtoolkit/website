# Quick Start Guide

This guide will get you up and running with CSV Toolkit in just a few minutes. We'll cover the most common use cases and show you how to leverage both automatic implementation selection and performance benefits.

## Basic Reading

Reading CSV files with CSV Toolkit is straightforward and automatically optimized:

```php
<?php
require_once 'vendor/autoload.php';

use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Configs\CsvConfig;

// Create a reader with automatic implementation selection
$reader = ReaderFactory::create('data.csv');

// Read records sequentially (memory efficient)
while (($record = $reader->nextRecord()) !== false) {
    echo "Name: {$record[0]}, Email: {$record[1]}\n";
}

// Or read with header support
$config = new CsvConfig();
$config->setHasHeader(true);

$reader = ReaderFactory::create('employees.csv', $config);
$header = $reader->getHeader();
echo "Columns: " . implode(', ', $header) . "\n";

while (($record = $reader->nextRecord()) !== false) {
    echo "Employee: {$record[0]}, Department: {$record[1]}\n";
}
?>
```

## Basic Writing

Writing CSV files is equally simple and performant:

```php
<?php
use CsvToolkit\Factories\WriterFactory;
use CsvToolkit\Configs\CsvConfig;

// Create a writer with automatic implementation selection
$writer = WriterFactory::create('output.csv');

// Write header row
$writer->write(['Name', 'Email', 'Age']);

// Write data rows
$writer->write(['John Doe', 'john@example.com', 30]);
$writer->write(['Jane Smith', 'jane@example.com', 25]);

// Write multiple rows at once
$data = [
    ['Bob Johnson', 'bob@example.com', 35],
    ['Alice Brown', 'alice@example.com', 28]
];
$writer->writeAll($data);

// Always close the writer to ensure data is written
$writer->close();
?>
```

## Configuration Options

CSV Toolkit supports extensive configuration options for different CSV formats:

```php
<?php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Factories\WriterFactory;
use CsvToolkit\Configs\CsvConfig;
use CsvToolkit\Enums\Encoding;

// Custom delimiter and enclosure
$config = new CsvConfig();
$config->setDelimiter(';')
       ->setEnclosure('"')
       ->setEscape('\\')
       ->setHasHeader(true);

$reader = ReaderFactory::create('semicolon-separated.csv', $config);

// Advanced configuration with encoding
$config = new CsvConfig();
$config->setDelimiter('|')
       ->setEncoding(Encoding::UTF16)
       ->setWriteBOM(true)
       ->setStrictMode(true)
       ->setTrimFields(true);

$writer = WriterFactory::create('custom-format.csv', $config);
?>
```

## Implementation Selection

CSV Toolkit automatically selects the best available implementation, but you can also control this manually:

```php
<?php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Helpers\ExtensionHelper;

// Check which implementation will be used
echo "Best implementation: " . ExtensionHelper::getBestImplementation() . "\n";
echo "FastCSV available: " . (ExtensionHelper::isFastCsvLoaded() ? 'Yes' : 'No') . "\n";

// Automatic selection (recommended)
$reader = ReaderFactory::create('data.csv');

// Force specific implementation
if (ExtensionHelper::isFastCsvLoaded()) {
    $fastReader = ReaderFactory::createFastCsv('data.csv');
    echo "Using FastCSV for maximum performance\n";
}

// Always available fallback
$splReader = ReaderFactory::createSpl('data.csv');
echo "Using SplFileObject implementation\n";
?>
```

## Working with Large Files

For large files, CSV Toolkit provides memory-efficient streaming:

```php
<?php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Factories\WriterFactory;
use CsvToolkit\Configs\CsvConfig;

// Process a large CSV file with constant memory usage
$reader = ReaderFactory::create('huge-dataset.csv');

// Configure writer for better performance with large datasets
$config = new CsvConfig();
$config->setAutoFlush(false); // Disable auto-flush for better performance

$writer = WriterFactory::create('processed-data.csv', $config);

$processedCount = 0;
while (($record = $reader->nextRecord()) !== false) {
    // Apply some transformation
    $record[2] = strtoupper($record[2]); // Uppercase third column
    
    // Write transformed record
    $writer->write($record);
    
    $processedCount++;
    
    // Flush periodically for large datasets
    if ($processedCount % 1000 === 0) {
        $writer->flush();
        echo "Processed {$processedCount} records\n";
    }
}

// Final flush and close
$writer->flush();
$writer->close();
echo "Total processed: {$processedCount} records\n";
?>
```

## Random Access and Seeking

CSV Toolkit supports efficient random access to records:

```php
<?php
use CsvToolkit\Factories\ReaderFactory;

$reader = ReaderFactory::create('large-file.csv');

// Get total record count
$totalRecords = $reader->getRecordCount();
echo "Total records: {$totalRecords}\n";

// Seek to specific positions
$record = $reader->seek(100);    // Get record at position 100
$record = $reader->seek(500);    // Jump to position 500
$record = $reader->seek(999);    // Get near the end

// Check current position
echo "Current position: " . $reader->getCurrentPosition() . "\n";

// Check if more records available
if ($reader->hasNext()) {
    $nextRecord = $reader->nextRecord();
}

// Rewind to beginning
$reader->rewind();
echo "Position after rewind: " . $reader->getCurrentPosition() . "\n";
?>
```

## Error Handling

CSV Toolkit provides comprehensive error handling with specific exceptions:

```php
<?php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Exceptions\FileNotFoundException;
use CsvToolkit\Exceptions\FileNotReadableException;
use CsvToolkit\Exceptions\EmptyFileException;
use CsvToolkit\Exceptions\CsvReaderException;

try {
    $reader = ReaderFactory::create('data.csv');
    
    while (($record = $reader->nextRecord()) !== false) {
        // Validate record data
        if (count($record) < 3) {
            throw new \InvalidArgumentException("Record has insufficient columns");
        }
        
        // Process record...
    }
    
} catch (FileNotFoundException $e) {
    echo "File not found: " . $e->getMessage() . "\n";
} catch (FileNotReadableException $e) {
    echo "Cannot read file: " . $e->getMessage() . "\n";
} catch (EmptyFileException $e) {
    echo "File is empty: " . $e->getMessage() . "\n";
} catch (CsvReaderException $e) {
    echo "CSV reading error: " . $e->getMessage() . "\n";
} catch (\Exception $e) {
    echo "General error: " . $e->getMessage() . "\n";
}
?>
```

## Performance Optimization Tips

- **Use automatic implementation selection:** Let CSV Toolkit choose the best available implementation
- **Disable auto-flush for bulk writes:** Set `setAutoFlush(false)` and call `flush()` periodically
- **Use streaming:** Read records sequentially instead of loading all into memory
- **Configure appropriately:** Set correct delimiters to avoid parsing errors
- **Close resources:** Always call `close()` on writers to ensure data is written
- **Batch operations:** Use `writeAll()` for multiple records when possible

## Benchmarking Your Performance

```php
<?php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Helpers\ExtensionHelper;

// Create test data
$testFile = 'benchmark.csv';
$writer = \CsvToolkit\Factories\WriterFactory::create($testFile);
for ($i = 0; $i < 10000; $i++) {
    $writer->write(["Record $i", "test$i@example.com", rand(20, 80)]);
}
$writer->close();

// Benchmark reading
echo "Implementation: " . ExtensionHelper::getBestImplementation() . "\n";

$start = microtime(true);
$reader = ReaderFactory::create($testFile);
$count = 0;
while (($record = $reader->nextRecord()) !== false) {
    $count++;
}
$end = microtime(true);

$duration = $end - $start;
$recordsPerSecond = $count / $duration;

echo "Read {$count} records in " . number_format($duration, 4) . " seconds\n";
echo "Performance: " . number_format($recordsPerSecond) . " records/second\n";

// Cleanup
unlink($testFile);
?>
```

## Common Patterns

### Processing CSV with Headers
```php
<?php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Configs\CsvConfig;

$config = new CsvConfig();
$config->setHasHeader(true);

$reader = ReaderFactory::create('employees.csv', $config);
$headers = $reader->getHeader();

while (($record = $reader->nextRecord()) !== false) {
    $employee = array_combine($headers, $record);
    echo "Employee: {$employee['name']}, Email: {$employee['email']}\n";
}
?>
```

### Converting CSV Formats
```php
<?php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Factories\WriterFactory;
use CsvToolkit\Configs\CsvConfig;

// Read semicolon-separated file
$inputConfig = new CsvConfig();
$inputConfig->setDelimiter(';');
$reader = ReaderFactory::create('input.csv', $inputConfig);

// Write comma-separated file
$outputConfig = new CsvConfig();
$outputConfig->setDelimiter(',');
$writer = WriterFactory::create('output.csv', $outputConfig);

// Copy all records
while (($record = $reader->nextRecord()) !== false) {
    $writer->write($record);
}

$writer->close();
?>
```

## Next Steps

Now that you understand the basics, explore more advanced features:

- [API Reference](api-reference.md) - Complete method documentation
- [Configuration Options](api-reference.md#configuration) - All available settings
- [Performance Tuning](api-reference.md#performance) - Optimization strategies
- [Error Handling](api-reference.md#exceptions) - Exception types and handling 