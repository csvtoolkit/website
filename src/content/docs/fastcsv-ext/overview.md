# FastCSV PHP Extension Overview

FastCSV PHP extension is a high-performance PHP extension that supercharges CSV processing in your PHP applications. Built on top of the FastCSV-C library, it delivers 3.6-4.8x faster performance compared to native PHP CSV functions.

## Why FastCSV PHP extension?

Traditional PHP CSV processing can be slow and memory-intensive, especially when dealing with large datasets. FastCSV PHP extension solves these problems by providing:

- **RFC 4180 Compliance** with Common Format and MIME Type for Comma-Separated Values (CSV) Files
- **Blazing Speed:** Up to 4.8x faster than existing solutions
- **Memory Efficiency:** Optimized memory usage for large files using Arena allocation
- **Drop-in Replacement:** Compatible API with existing PHP CSV workflows
- **Cross-Platform:** Works on Linux, macOS, and Windows
- **Modern PHP:** Supports PHP 8.2, 8.3, and 8.4

## Performance Benchmarks

Our extensive benchmarks show significant performance improvements:

> **Reading Performance:** Up to 568K records/sec vs 156K (SplFileObject)
> 
> **Combined Performance:** Up to 339K records/sec vs 136K (SplFileObject)

## Key Features

- Native C implementation for maximum speed
- Arena-based memory management for optimal performance
- Thread-safe operations
- Comprehensive error handling
- Full Unicode support with multiple encoding options
- Configurable delimiters, quotes, and escape characters
- Advanced navigation capabilities (seek, rewind, position tracking)

## Quick Example

### Reading a CSV file:
```php
<?php
use FastCSVConfig;
use FastCSVReader;

// Create configuration
$config = new FastCSVConfig();
$config->setPath("path/to/file.csv");

// Create reader
$reader = new FastCSVReader($config);

// Read records one by one
while ($reader->hasNext()) {
    $record = $reader->nextRecord();
    // Process record
}

// Or use direct iteration
while (($record = $reader->nextRecord()) !== false) {
    // Process record
}

// Navigation methods
$reader->rewind();
$record = $reader->seek(5); // Get 6th record (0-based)
$position = $reader->getPosition();
$count = $reader->getRecordCount();
$headers = $reader->getHeaders();
?>
```

### Writing a CSV file:
```php
<?php
use FastCSVConfig;
use FastCSVWriter;

// Create configuration
$config = new FastCSVConfig();
$config->setPath("path/to/output.csv");

// Create writer with headers
$writer = new FastCSVWriter($config, ['Name', 'Email', 'Age']);

// Write records
$writer->writeRecord(['John Doe', 'john@example.com', 30]);
$writer->writeRecord(['Jane Smith', 'jane@example.com', 25]);

// For high-performance scenarios, disable auto-flush
$config->setAutoFlush(false);
$writer = new FastCSVWriter($config, ['ID', 'Data']);

for ($i = 0; $i < 100000; $i++) {
    $writer->writeRecord([$i, "Data$i"]);
    
    // Manual flush every 1000 records for optimal performance
    if ($i % 1000 == 0) {
        $writer->flush();
    }
}

$writer->close(); // Final flush on close
?>
```

## Getting Started

Ready to supercharge your CSV processing? Check out our [Installation Guide](/docs/fastcsv-ext/installation) to get started, or jump straight to the [Quick Start](/docs/fastcsv-ext/quick-start) tutorial.

## Support & Community

FastCSV PHP extension is actively maintained and supported. If you encounter any issues or have questions:

- 📖 Check the [API Reference](/docs/fastcsv-ext/api-reference)
- 🐛 Report issues on [GitHub](https://github.com/csvtoolkit/FastCSV-ext/issues)
- 💬 Join discussions in our [GitHub Discussions](https://github.com/csvtoolkit/FastCSV-ext/discussions) 