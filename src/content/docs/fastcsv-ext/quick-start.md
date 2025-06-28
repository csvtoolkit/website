# Quick Start Guide

This guide will get you up and running with FastCSV-ext in just a few minutes. We'll cover the most common use cases and show you how to leverage the performance benefits.

## Basic Reading

Reading CSV files with FastCSV-ext is straightforward and fast:

```php
<?php
use FastCSVConfig;
use FastCSVReader;

// Create configuration
$config = new FastCSVConfig();
$config->setPath('data.csv');

// Create reader instance
$reader = new FastCSVReader($config);

// Read records one by one (memory efficient)
while ($reader->hasNext()) {
    $record = $reader->nextRecord();
    echo "Name: {$record[0]}, Email: {$record[1]}\n";
}

// Or use direct iteration
$reader = new FastCSVReader($config);
$count = 0;
while (($record = $reader->nextRecord()) !== false) {
    echo "Row {$count}: " . implode(', ', $record) . "\n";
    $count++;
    
    // Process only first 100 rows
    if ($count >= 100) break;
}
?>
```

## Basic Writing

Writing CSV files is equally simple and performant:

```php
<?php
use FastCSVConfig;
use FastCSVWriter;

// Create configuration
$config = new FastCSVConfig();
$config->setPath('output.csv');

// Create writer instance with headers
$writer = new FastCSVWriter($config, ['Name', 'Email', 'Age']);

// Write data records
$writer->writeRecord(['John Doe', 'john@example.com', 30]);
$writer->writeRecord(['Jane Smith', 'jane@example.com', 25]);

// Write multiple records
$data = [
    ['Bob Johnson', 'bob@example.com', 35],
    ['Alice Brown', 'alice@example.com', 28]
];

foreach ($data as $record) {
    $writer->writeRecord($record);
}

// Always close the writer
$writer->close();
?>
```

## Configuration Options

FastCSV-ext supports various configuration options for different CSV formats:

```php
<?php
use FastCSVConfig;
use FastCSVReader;
use FastCSVWriter;

// Custom delimiter and enclosure
$config = new FastCSVConfig();
$config->setPath('semicolon-separated.csv')
       ->setDelimiter(';')
       ->setEnclosure('"')
       ->setEscape('\\');

$reader = new FastCSVReader($config);

// Skip header row
$config = new FastCSVConfig();
$config->setPath('with-header.csv')
       ->setHasHeader(false);

$reader = new FastCSVReader($config);

// Custom writer configuration
$config = new FastCSVConfig();
$config->setPath('custom-format.csv')
       ->setDelimiter('|')
       ->setEnclosure("'");

$writer = new FastCSVWriter($config, ['ID', 'Name', 'Value']);
?>
```

## Working with Headers

FastCSV-ext provides convenient methods for working with CSV headers:

```php
<?php
use FastCSVConfig;
use FastCSVReader;

$config = new FastCSVConfig();
$config->setPath('employees.csv');

$reader = new FastCSVReader($config);

// Get header row
$headers = $reader->getHeaders();
if ($headers !== false) {
    echo "Columns: " . implode(', ', $headers) . "\n";
}

// Read records and associate with headers
while ($reader->hasNext()) {
    $record = $reader->nextRecord();
    if ($headers !== false && count($headers) === count($record)) {
        $assocRecord = array_combine($headers, $record);
        echo "Employee: {$assocRecord['name']}, Department: {$assocRecord['department']}\n";
    }
}
?>
```

## Memory-Efficient Processing

For large files, use streaming to maintain constant memory usage:

```php
<?php
use FastCSVConfig;
use FastCSVReader;
use FastCSVWriter;

// Process a large CSV file with constant memory usage
$readerConfig = new FastCSVConfig();
$readerConfig->setPath('huge-dataset.csv');

$writerConfig = new FastCSVConfig();
$writerConfig->setPath('processed-data.csv')
             ->setAutoFlush(false); // Disable auto-flush for performance

$reader = new FastCSVReader($readerConfig);
$writer = new FastCSVWriter($writerConfig, ['ID', 'Name', 'ProcessedValue']);

$processedCount = 0;
while ($reader->hasNext()) {
    $record = $reader->nextRecord();
    
    // Apply some transformation
    $record[2] = strtoupper($record[2]); // Uppercase third column
    
    // Write transformed record
    $writer->writeRecord($record);
    
    $processedCount++;
    if ($processedCount % 10000 === 0) {
        echo "Processed {$processedCount} records\n";
        $writer->flush(); // Manual flush every 10k records
    }
}

$writer->close();
echo "Total processed: {$processedCount} records\n";
?>
```

## Advanced Navigation

FastCSV-ext provides advanced navigation capabilities:

```php
<?php
use FastCSVConfig;
use FastCSVReader;

$config = new FastCSVConfig();
$config->setPath('large-file.csv');

$reader = new FastCSVReader($config);

// Get total record count
$totalRecords = $reader->getRecordCount();
echo "Total records: {$totalRecords}\n";

// Jump to specific record
$record = $reader->seek(1000); // Get 1001st record (0-based)
if ($record !== false) {
    echo "Record 1001: " . implode(', ', $record) . "\n";
}

// Get current position
$position = $reader->getPosition();
echo "Current position: {$position}\n";

// Rewind to beginning
$reader->rewind();

// Read from beginning
while ($reader->hasNext()) {
    $record = $reader->nextRecord();
    // Process record
}
?>
```

## Error Handling

FastCSV-ext provides comprehensive error handling:

```php
<?php
use FastCSVConfig;
use FastCSVReader;

try {
    $config = new FastCSVConfig();
    $config->setPath('data.csv');
    
    $reader = new FastCSVReader($config);
    
    while ($reader->hasNext()) {
        $record = $reader->nextRecord();
        
        // Validate record data
        if (count($record) < 3) {
            throw new Exception("Record has insufficient columns");
        }
        
        // Process record...
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
```

## Performance Tips

- **Use streaming:** Read records one by one instead of loading all data into memory
- **Disable auto-flush:** Use `setAutoFlush(false)` for bulk operations and call `flush()` manually
- **Proper configuration:** Set correct delimiters to avoid parsing errors
- **Close resources:** Always call `close()` on writers to flush buffers
- **Use seek():** For random access to specific records instead of reading sequentially
- **Batch processing:** Process records in batches for optimal performance

## Benchmarking Your Code

Compare FastCSV-ext performance with native PHP functions:

```php
<?php
// Benchmark FastCSV-ext vs native PHP
$file = 'large-dataset.csv';
$iterations = 1000;

// FastCSV-ext timing
$start = microtime(true);
for ($i = 0; $i < $iterations; $i++) {
    $config = new FastCSVConfig();
    $config->setPath($file);
    $reader = new FastCSVReader($config);
    
    $count = 0;
    while ($reader->hasNext()) {
        $record = $reader->nextRecord();
        $count++;
    }
}
$fastcsvTime = microtime(true) - $start;

// Native PHP timing
$start = microtime(true);
for ($i = 0; $i < $iterations; $i++) {
    $handle = fopen($file, 'r');
    $count = 0;
    while (($row = fgetcsv($handle)) !== false) {
        $count++;
    }
    fclose($handle);
}
$nativeTime = microtime(true) - $start;

$speedup = $nativeTime / $fastcsvTime;
echo "FastCSV-ext is {$speedup}x faster than native PHP\n";
?>
```

## Next Steps

Now that you know the basics, explore more advanced features:

- [API Reference](/docs/fastcsv-ext/api-reference) - Complete method documentation
- [Examples](/docs/fastcsv-ext/examples) - Real-world usage scenarios
- [GitHub Repository](https://github.com/csvtoolkit/FastCSV-ext) - Source code and issues 