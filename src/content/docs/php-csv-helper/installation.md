# Installation

CSV Toolkit can be installed easily via Composer and works with or without the optional FastCSV extension for enhanced performance.

## Method 1: Composer Installation (Recommended)

The easiest way to install CSV Toolkit is using Composer:

```bash
composer require csvtoolkit/csv-helper
```

This installs the complete CSV Toolkit package with automatic implementation selection. The library will work immediately with PHP's built-in SplFileObject and will automatically use the FastCSV extension if available for better performance.

## Method 2: FastCSV Extension for Enhanced Performance

For maximum performance, optionally install the FastCSV PHP extension. CSV Toolkit will automatically detect and use it when available.

### Linux (Ubuntu/Debian)

```bash
# Download the latest FastCSV extension release
# Visit: https://github.com/csvtoolkit/FastCSV-ext/releases

# Download the appropriate file for your PHP version
# Example: fastcsv-linux-php8.4.so for PHP 8.4

# Copy to PHP extensions directory
sudo cp fastcsv-linux-php8.4.so /usr/lib/php/$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")/fastcsv.so

# Enable the extension
echo "extension=fastcsv" | sudo tee /etc/php/$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")/mods-available/fastcsv.ini
sudo phpenmod fastcsv
```

### macOS

```bash
# Download the latest FastCSV extension release
# Visit: https://github.com/csvtoolkit/FastCSV-ext/releases

# Download the appropriate file for your PHP version
# Example: fastcsv-macos-php8.4.so for PHP 8.4

# Copy to PHP extensions directory
sudo cp fastcsv-macos-php8.4.so /usr/local/lib/php/extensions/no-debug-non-zts-*/fastcsv.so

# Add to php.ini
echo "extension=fastcsv" >> /usr/local/etc/php/php.ini
```

## Method 3: Build FastCSV Extension from Source

For advanced users or custom configurations, you can build the FastCSV extension from source.

### Prerequisites

- PHP development headers (php-dev package)
- C compiler (gcc or clang)
- Make and autotools
- Git

### Build Steps

```bash
# Clone the FastCSV extension repository
git clone https://github.com/csvtoolkit/FastCSV-ext.git
cd FastCSV-ext

# Initialize submodules (includes FastCSV-C)
git submodule update --init --recursive

# Build the extension
phpize
./configure
make

# Install
sudo make install

# Enable the extension
echo "extension=fastcsv" >> /etc/php/php.ini
```

## Verification

After installation, verify that CSV Toolkit is working correctly:

### Basic Package Verification

```bash
# Test CSV Toolkit installation
php -r "
use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Helpers\ExtensionHelper;

echo 'CSV Toolkit installed successfully!' . PHP_EOL;
echo 'FastCSV extension: ' . (ExtensionHelper::isFastCsvLoaded() ? 'Available' : 'Not available') . PHP_EOL;
echo 'Implementation: ' . ExtensionHelper::getBestImplementation() . PHP_EOL;
"
```

### FastCSV Extension Verification

```bash
# Check if FastCSV extension is loaded
php -m | grep fastcsv

# View extension information
php -i | grep fastcsv

# Test extension functionality
php -r "echo 'FastCSV extension version: ' . phpversion('fastcsv') . PHP_EOL;"
```

### Complete Functionality Test

```php
<?php
require 'vendor/autoload.php';

use CsvToolkit\Factories\ReaderFactory;
use CsvToolkit\Factories\WriterFactory;
use CsvToolkit\Helpers\ExtensionHelper;

// Create a test CSV file
$writer = WriterFactory::create('test.csv');
$writer->write(['Name', 'Age', 'Email']);
$writer->write(['John Doe', '30', 'john@example.com']);
$writer->close();

// Read the test file
$reader = ReaderFactory::create('test.csv');
$header = $reader->getHeader();
$record = $reader->nextRecord();

echo "Implementation: " . ExtensionHelper::getBestImplementation() . PHP_EOL;
echo "Header: " . implode(', ', $header) . PHP_EOL;
echo "Record: " . implode(', ', $record) . PHP_EOL;
echo "Test successful!" . PHP_EOL;

// Cleanup
unlink('test.csv');
?>
```

## Docker Installation

For containerized environments, you can use CSV Toolkit with or without the FastCSV extension:

### Basic CSV Toolkit (SplFileObject only)

```dockerfile
FROM php:8.3-cli

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install CSV Toolkit
RUN composer require csvtoolkit/csv-helper
```

### With FastCSV Extension

```dockerfile
FROM php:8.3-cli

# Install FastCSV extension
# Download from: https://github.com/csvtoolkit/FastCSV-ext/releases
RUN curl -L https://github.com/csvtoolkit/FastCSV-ext/releases/latest/download/fastcsv-linux-php8.3.so -o /tmp/fastcsv.so \
    && cp /tmp/fastcsv.so $(php-config --extension-dir)/ \
    && echo "extension=fastcsv" > /usr/local/etc/php/conf.d/fastcsv.ini

# Install Composer and CSV Toolkit
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer require csvtoolkit/csv-helper
```

## Troubleshooting

### Package Not Found

- Ensure Composer is installed and up to date
- Check that you have internet connectivity
- Verify the package name: `csvtoolkit/csv-helper`

### FastCSV Extension Not Loading

- Check PHP error logs for loading errors
- Verify the extension file is in the correct directory
- Ensure PHP version compatibility (8.3+)
- Check file permissions on the extension file

### Performance Issues

- Verify which implementation is being used with `ExtensionHelper::getBestImplementation()`
- For large files, ensure you're using streaming (sequential reading)
- Consider disabling auto-flush for bulk write operations

### Compilation Errors (FastCSV Extension)

- Install PHP development headers: `apt-get install php-dev`
- Update build tools: `apt-get install build-essential`
- Check PHP version compatibility

## Requirements

### Minimum Requirements

- **PHP**: 8.3 or higher
- **Composer**: 2.0 or higher
- **Memory**: 64MB (for basic operations)

### Recommended for Production

- **PHP**: 8.3+ with FastCSV extension
- **Memory**: 256MB+ (for large file processing)
- **Disk**: SSD for better I/O performance

## Next Steps

Once CSV Toolkit is installed and verified, you're ready to start processing CSV files! Check out the [Quick Start Guide](quick-start.md) to learn the basics, or dive into the [API Reference](api-reference.md) for detailed documentation. 