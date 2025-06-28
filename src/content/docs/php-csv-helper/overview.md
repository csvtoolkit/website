# CSV Toolkit Package Overview

CSV Toolkit is a modern, high-performance PHP library that provides a unified interface for CSV file processing. It automatically selects the best available implementation, using the FastCSV extension when available for maximum performance, with graceful fallback to PHP's built-in SplFileObject.

## Why CSV Toolkit?

Traditional CSV processing in PHP can be inconsistent and performance-limited. CSV Toolkit solves these problems by providing:

- **Automatic Implementation Selection**: Uses FastCSV extension when available, falls back to SplFileObject
- **Unified Interface**: Same API regardless of underlying implementation
- **High Performance**: Up to 4.8x faster with FastCSV extension
- **Type Safety**: Full PHP 8.3+ type declarations with strict typing
- **Comprehensive Configuration**: Advanced CSV options including encoding, BOM, strict mode
- **Enterprise-Ready**: Robust error handling with specific exception types
- **Memory Efficient**: Streaming support for large files with constant memory usage

## Performance Benefits

When the FastCSV extension is available, CSV Toolkit delivers significant performance improvements:

> **Reading Performance:** Up to 568K records/sec vs 156K (SplFileObject) - **4.8x faster**
> 
> **Combined Read/Write:** Up to 339K records/sec vs 136K (SplFileObject) - **2.9x faster**

### Benchmark Results (PHP 8.4.8, 1GB memory limit)

**Read Operations:**
- **Small datasets (1K rows)**: **4.1x faster** - 272K vs 67K records/sec
- **Medium datasets (100K rows)**: **3.6x faster** - 568K vs 156K records/sec  
- **Large datasets (1M rows)**: **4.8x faster** - 503K vs 106K records/sec

**Combined Read/Write Operations:**
- **Small datasets**: **1.6x faster** - 88K vs 56K records/sec
- **Medium datasets**: **2.5x faster** - 339K vs 136K records/sec
- **Large datasets**: **2.9x faster** - 282K vs 98K records/sec

## Key Features

### Dual Implementation Support
- **FastCSV Extension**: Native C implementation for maximum speed
- **SplFileObject Fallback**: Pure PHP implementation always available
- **Automatic Detection**: Seamlessly switches between implementations

### Advanced Configuration
- Custom delimiters, enclosures, and escape characters
- Encoding support (UTF-8, UTF-16, Latin1, etc.)
- BOM (Byte Order Mark) handling
- Strict mode for data validation
- Auto-flush control for write performance
- Header row management

### Comprehensive API
- Sequential and random access reading
- Batch and single record writing  
- Position tracking and seeking
- Record counting and validation
- Memory-efficient streaming

## Architecture

```php
<?php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Factories\WriterFactory;

// Automatic implementation selection
$reader = ReaderFactory::create('data.csv');  // Uses FastCSV if available
$writer = WriterFactory::create('output.csv'); // Falls back to SplFileObject

// Manual implementation selection
$fastReader = ReaderFactory::createFastCsv('data.csv');  // Requires FastCSV
$splReader = ReaderFactory::createSpl('data.csv');       // Always available
?>
```

## Quick Example

### Reading CSV Files:
```php
<?php
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Configs\CsvConfig;

// Basic reading with automatic implementation
$reader = ReaderFactory::create('data.csv');

// Read with custom configuration
$config = new CsvConfig();
$config->setDelimiter(';')
       ->setEnclosure('"')
       ->setHasHeader(true);

$reader = ReaderFactory::create('data.csv', $config);

// Sequential reading
while (($record = $reader->nextRecord()) !== false) {
    // Process record
    print_r($record);
}

// Random access
$record = $reader->seek(100); // Get record at position 100
?>
```

### Writing CSV Files:
```php
<?php
use CsvToolkit\Factories\WriterFactory;
use CsvToolkit\Configs\CsvConfig;

// Basic writing
$writer = WriterFactory::create('output.csv');

// Write with configuration
$config = new CsvConfig();
$config->setDelimiter(',')
       ->setAutoFlush(false); // Better performance for bulk writes

$writer = WriterFactory::create('output.csv', $config);

// Write single records
$writer->write(['Name', 'Age', 'Email']);
$writer->write(['John Doe', '30', 'john@example.com']);

// Write multiple records
$records = [
    ['Jane Smith', '25', 'jane@example.com'],
    ['Bob Johnson', '35', 'bob@example.com']
];
$writer->writeAll($records);

// Ensure data is written
$writer->flush();
$writer->close();
?>
```

## Implementation Detection

```php
<?php
use CsvToolkit\Helpers\ExtensionHelper;

// Check FastCSV availability
if (ExtensionHelper::isFastCsvLoaded()) {
    echo "Using high-performance FastCSV extension";
} else {
    echo "Using SplFileObject fallback";
}

// Get detailed information
$info = ExtensionHelper::getFastCsvInfo();
print_r($info);
// Array
// (
//     [loaded] => true
//     [version] => 0.0.1
//     [available_classes] => Array
//         (
//             [0] => FastCSVConfig
//             [1] => FastCSVReader
//             [2] => FastCSVWriter
//         )
// )
?>
```

## Getting Started

Ready to start using CSV Toolkit? Check out our [Installation Guide](installation.md) to get started, or jump straight to the [Quick Start Guide](quick-start.md) for hands-on examples.

## Support & Community

CSV Toolkit is actively maintained and supported. If you encounter any issues or have questions:

- 📖 Check the [API Reference](api-reference.md)
- 🐛 Report issues on [GitHub](https://github.com/csvtoolkit/csv-helper/issues)
- 💬 Join discussions in our [GitHub Discussions](https://github.com/csvtoolkit/csv-helper/discussions) 