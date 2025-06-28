# FastCSV C Library Overview

FastCSV is a high-performance, memory-safe CSV parsing and writing library written in C with custom arena-based memory management. Designed for production use with zero memory leaks, comprehensive error handling, and enterprise-grade features including multi-encoding support and RFC 4180 compliance.

## Why FastCSV C Library?

Traditional CSV processing can be slow and memory-intensive, especially when dealing with large datasets. FastCSV solves these problems by providing:

- **🛡️ Memory Safe**: Zero memory leaks, validated with Valgrind
- **⚡ Ultra High Performance**: 7.6M+ operations/second with optimized parsing
- **🎯 Custom Memory Management**: Arena-based allocator for efficient memory usage
- **🌐 Multi-Encoding Support**: UTF-8, UTF-16, UTF-32, ASCII, Latin1 with BOM support
- **📝 RFC 4180 Compliant**: Proper quote escaping and multi-line field support
- **🔧 Flexible Configuration**: Customizable delimiters, quotes, strict mode, and field trimming
- **📊 Advanced Reader Features**: Navigation, seeking, header management, and position tracking
- **✅ Comprehensive Testing**: 60+ tests across 6 test suites with 100% pass rate
- **🌐 Cross-Platform**: Works on Linux, macOS, and other Unix-like systems
- **📚 Library Ready**: Designed for integration into larger projects and language bindings

## Performance Benchmarks

Our extensive benchmarks show significant performance improvements:

> **Reading Performance:** Up to 568K records/sec with arena-based memory management
> 
> **Writing Performance:** Up to 5.2M ops/sec with zero fragmentation
> 
> **Memory Efficiency:** 90% less malloc calls with predictable cleanup

## Key Features

- Native C implementation for maximum speed
- Arena-based memory management for zero leaks
- Streaming support for constant memory usage
- Thread-safe operations
- Comprehensive error handling
- Full Unicode support with BOM detection
- Configurable delimiters and escape characters
- RFC 4180 compliant quote escaping
- Multi-line field support

## Quick Example

### Reading a CSV file:
```c
#include "csv_reader.h"
#include "arena.h"

int main() {
    // Initialize arena allocator
    Arena arena;
    arena_create(&arena, 4096);
    
    // Create configuration with encoding support
    CSVConfig *config = csv_config_create(&arena);
    csv_config_set_path(config, "data.csv");
    csv_config_set_has_header(config, true);
    csv_config_set_encoding(config, CSV_ENCODING_UTF8);
    
    // Initialize reader
    CSVReader *reader = csv_reader_init_with_config(&arena, config);
    
    // Get headers
    int header_count;
    char **headers = csv_reader_get_headers(reader, &header_count);
    printf("Headers: ");
    for (int i = 0; i < header_count; i++) {
        printf("%s ", headers[i]);
    }
    printf("\n");
    
    // Read records with navigation support
    while (csv_reader_has_next(reader)) {
        CSVRecord *record = csv_reader_next_record(reader);
        if (record) {
            printf("Record at position %ld:\n", csv_reader_get_position(reader));
            for (int i = 0; i < record->field_count; i++) {
                printf("  %s: %s\n", headers[i], record->fields[i]);
            }
        }
    }
    
    // Cleanup
    csv_reader_free(reader);
    arena_destroy(&arena);
    return 0;
}
```

### Writing a CSV file:
```c
#include "csv_writer.h"
#include "arena.h"

int main() {
    Arena arena;
    arena_create(&arena, 4096);
    
    // Configure with UTF-8 and BOM
    CSVConfig *config = csv_config_create(&arena);
    csv_config_set_path(config, "output.csv");
    csv_config_set_encoding(config, CSV_ENCODING_UTF8);
    csv_config_set_write_bom(config, true);
    csv_config_set_strict_mode(config, true);
    
    // Initialize writer
    CSVWriter *writer;
    char *headers[] = {"Name", "Age", "City"};
    csv_writer_init(&writer, config, headers, 3, &arena);
    
    // Write data with automatic quoting
    char *row1[] = {"John Doe", "30", "New York"};
    csv_writer_write_record(writer, row1, 3);
    
    char *row2[] = {"Jane Smith", "25", "Los Angeles"};
    csv_writer_write_record(writer, row2, 3);
    
    csv_writer_free(writer);
    arena_destroy(&arena);
    return 0;
}
```

## Getting Started

Ready to supercharge your CSV processing? Check out our [Installation Guide](/docs/fastcsv-c/installation) to get started, or jump straight to the [Quick Start](/docs/fastcsv-c/quick-start) tutorial.

## Support & Community

FastCSV C library is actively maintained and supported. If you encounter any issues or have questions:

- 📖 Check the [API Reference](/docs/fastcsv-c/api-reference)
- 🐛 Report issues on [GitHub](https://github.com/csvtoolkit/FastCSV-C/issues)
- 💬 Join discussions in our [GitHub Discussions](https://github.com/csvtoolkit/FastCSV-C/discussions) 