# Quick Start Guide

This guide will get you up and running with FastCSV C library in just a few minutes. We'll cover the most common use cases and show you how to leverage the performance benefits.

## Basic Reading

Reading CSV files with FastCSV is straightforward and fast:

```c
#include "csv_reader.h"
#include "arena.h"
#include <stdio.h>

int main() {
    // Initialize arena allocator
    Arena arena;
    arena_create(&arena, 4096);
    
    // Create configuration
    CSVConfig *config = csv_config_create(&arena);
    csv_config_set_path(config, "data.csv");
    csv_config_set_has_header(config, true);
    
    // Initialize reader
    CSVReader *reader = csv_reader_init_with_config(&arena, config);
    
    // Read all records
    while (csv_reader_has_next(reader)) {
        CSVRecord *record = csv_reader_next_record(reader);
        if (record) {
            printf("Record: ");
            for (int i = 0; i < record->field_count; i++) {
                printf("%s ", record->fields[i]);
            }
            printf("\n");
        }
    }
    
    // Cleanup
    csv_reader_free(reader);
    arena_destroy(&arena);
    return 0;
}
```

## Basic Writing

Writing CSV files is equally simple and performant:

```c
#include "csv_writer.h"
#include "arena.h"
#include <stdio.h>

int main() {
    // Initialize arena
    Arena arena;
    arena_create(&arena, 4096);
    
    // Create configuration
    CSVConfig *config = csv_config_create(&arena);
    csv_config_set_path(config, "output.csv");
    csv_config_set_encoding(config, CSV_ENCODING_UTF8);
    
    // Initialize writer with headers
    CSVWriter *writer;
    char *headers[] = {"Name", "Email", "Age"};
    csv_writer_init(&writer, config, headers, 3, &arena);
    
    // Write data rows
    char *row1[] = {"John Doe", "john@example.com", "30"};
    csv_writer_write_record(writer, row1, 3);
    
    char *row2[] = {"Jane Smith", "jane@example.com", "25"};
    csv_writer_write_record(writer, row2, 3);
    
    // Cleanup
    csv_writer_free(writer);
    arena_destroy(&arena);
    return 0;
}
```

## Configuration Options

FastCSV supports various configuration options for different CSV formats:

```c
#include "csv_config.h"
#include "arena.h"

int main() {
    Arena arena;
    arena_create(&arena, 4096);
    
    CSVConfig *config = csv_config_create(&arena);
    
    // Custom delimiter and enclosure
    csv_config_set_delimiter(config, ';');        // Use semicolon
    csv_config_set_enclosure(config, '\'');       // Use single quotes
    csv_config_set_escape(config, '\\');          // Use backslash escape
    
    // Parsing behavior
    csv_config_set_trim_fields(config, true);     // Trim whitespace
    csv_config_set_skip_empty_lines(config, true); // Skip empty lines
    csv_config_set_strict_mode(config, true);     // Enable strict validation
    
    // Encoding and BOM support
    csv_config_set_encoding(config, CSV_ENCODING_UTF8);
    csv_config_set_write_bom(config, true);
    
    // File handling
    csv_config_set_path(config, "data.csv");
    csv_config_set_has_header(config, true);
    csv_config_set_offset(config, 100);  // Skip first 100 lines
    csv_config_set_limit(config, 1000);  // Process only 1000 records
    
    arena_destroy(&arena);
    return 0;
}
```

## Working with Headers

FastCSV provides convenient methods for working with CSV headers:

```c
#include "csv_reader.h"
#include "arena.h"
#include <stdio.h>

int main() {
    Arena arena;
    arena_create(&arena, 4096);
    
    CSVConfig *config = csv_config_create(&arena);
    csv_config_set_path(config, "employees.csv");
    csv_config_set_has_header(config, true);
    
    CSVReader *reader = csv_reader_init_with_config(&arena, config);
    
    // Get header row
    int header_count;
    char **headers = csv_reader_get_headers(reader, &header_count);
    printf("Columns: ");
    for (int i = 0; i < header_count; i++) {
        printf("%s ", headers[i]);
    }
    printf("\n");
    
    // Read records with header access
    while (csv_reader_has_next(reader)) {
        CSVRecord *record = csv_reader_next_record(reader);
        if (record) {
            printf("Employee: %s, Department: %s\n", 
                   record->fields[0], record->fields[1]);
        }
    }
    
    csv_reader_free(reader);
    arena_destroy(&arena);
    return 0;
}
```

## Memory-Efficient Processing

For large files, use streaming to maintain constant memory usage:

```c
#include "csv_reader.h"
#include "csv_writer.h"
#include "arena.h"
#include <stdio.h>
#include <string.h>

int main() {
    Arena arena;
    arena_create(&arena, 8192); // Larger arena for processing
    
    // Setup reader
    CSVConfig *reader_config = csv_config_create(&arena);
    csv_config_set_path(reader_config, "huge-dataset.csv");
    csv_config_set_has_header(reader_config, true);
    
    CSVReader *reader = csv_reader_init_with_config(&arena, reader_config);
    
    // Setup writer
    CSVConfig *writer_config = csv_config_create(&arena);
    csv_config_set_path(writer_config, "processed-data.csv");
    csv_config_set_encoding(writer_config, CSV_ENCODING_UTF8);
    
    CSVWriter *writer;
    char *headers[] = {"Name", "Email", "Department"};
    csv_writer_init(&writer, writer_config, headers, 3, &arena);
    
    int processed_count = 0;
    while (csv_reader_has_next(reader)) {
        CSVRecord *record = csv_reader_next_record(reader);
        if (record) {
            // Apply transformation (uppercase department)
            char *transformed_fields[3];
            transformed_fields[0] = record->fields[0];
            transformed_fields[1] = record->fields[1];
            
            // Create uppercase version of department
            char *dept = record->fields[2];
            char *upper_dept;
            arena_strdup(&arena, dept, &upper_dept);
            for (int i = 0; upper_dept[i]; i++) {
                upper_dept[i] = toupper(upper_dept[i]);
            }
            transformed_fields[2] = upper_dept;
            
            // Write transformed row
            csv_writer_write_record(writer, transformed_fields, 3);
            
            processed_count++;
            if (processed_count % 10000 == 0) {
                printf("Processed %d rows\n", processed_count);
            }
        }
    }
    
    printf("Total processed: %d rows\n", processed_count);
    
    csv_writer_free(writer);
    csv_reader_free(reader);
    arena_destroy(&arena);
    return 0;
}
```

## Error Handling

FastCSV provides comprehensive error handling:

```c
#include "csv_reader.h"
#include "arena.h"
#include <stdio.h>
#include <errno.h>

int main() {
    Arena arena;
    ArenaResult arena_result = arena_create(&arena, 4096);
    if (arena_result != ARENA_OK) {
        fprintf(stderr, "Failed to create arena: %d\n", arena_result);
        return 1;
    }
    
    CSVConfig *config = csv_config_create(&arena);
    if (!config) {
        fprintf(stderr, "Failed to create config\n");
        arena_destroy(&arena);
        return 1;
    }
    
    csv_config_set_path(config, "data.csv");
    
    CSVReader *reader = csv_reader_init_with_config(&arena, config);
    if (!reader) {
        fprintf(stderr, "Failed to initialize reader\n");
        arena_destroy(&arena);
        return 1;
    }
    
    int row_index = 0;
    while (csv_reader_has_next(reader)) {
        CSVRecord *record = csv_reader_next_record(reader);
        if (!record) {
            fprintf(stderr, "Failed to read record at row %d\n", row_index);
            continue;
        }
        
        // Validate row data
        if (record->field_count < 3) {
            fprintf(stderr, "Row %d has insufficient columns: %d\n", 
                    row_index, record->field_count);
            continue;
        }
        
        // Process row...
        printf("Row %d: %s, %s, %s\n", 
               row_index, record->fields[0], record->fields[1], record->fields[2]);
        
        row_index++;
    }
    
    csv_reader_free(reader);
    arena_destroy(&arena);
    return 0;
}
```

## Performance Tips

- **Use arena allocation**: Arena-based memory management reduces malloc overhead
- **Stream processing**: Process records one by one instead of loading all data
- **Proper configuration**: Set correct delimiters and encoding to avoid parsing errors
- **Memory cleanup**: Always call cleanup functions to prevent memory leaks
- **Batch operations**: Use appropriate arena sizes for your workload
- **Avoid string copying**: Use arena_strdup for efficient string management

## Benchmarking Your Code

Compare FastCSV performance with other CSV libraries:

```c
#include "csv_reader.h"
#include "arena.h"
#include <stdio.h>
#include <time.h>

int main() {
    const char *filename = "large-dataset.csv";
    const int iterations = 100;
    
    // FastCSV timing
    clock_t start = clock();
    for (int i = 0; i < iterations; i++) {
        Arena arena;
        arena_create(&arena, 4096);
        
        CSVConfig *config = csv_config_create(&arena);
        csv_config_set_path(config, filename);
        
        CSVReader *reader = csv_reader_init_with_config(&arena, config);
        
        int count = 0;
        while (csv_reader_has_next(reader)) {
            CSVRecord *record = csv_reader_next_record(reader);
            if (record) count++;
        }
        
        csv_reader_free(reader);
        arena_destroy(&arena);
    }
    clock_t fastcsv_time = clock() - start;
    
    printf("FastCSV processed %d iterations in %.2f seconds\n", 
           iterations, (double)fastcsv_time / CLOCKS_PER_SEC);
    
    return 0;
}
```

## Advanced Features

### Multi-Encoding Support

```c
#include "csv_config.h"
#include "arena.h"

int main() {
    Arena arena;
    arena_create(&arena, 4096);
    
    CSVConfig *config = csv_config_create(&arena);
    
    // Support different encodings
    CSVEncoding encodings[] = {
        CSV_ENCODING_UTF8,
        CSV_ENCODING_UTF16LE,
        CSV_ENCODING_UTF16BE,
        CSV_ENCODING_LATIN1,
        CSV_ENCODING_ASCII
    };
    
    for (int i = 0; i < 5; i++) {
        csv_config_set_encoding(config, encodings[i]);
        csv_config_set_write_bom(config, true); // No BOM for ASCII/Latin1
        // Process file with this encoding...
    }
    
    arena_destroy(&arena);
    return 0;
}
```

### Navigation and Seeking

```c
#include "csv_reader.h"
#include "arena.h"
#include <stdio.h>

int main() {
    Arena arena;
    arena_create(&arena, 4096);
    
    CSVConfig *config = csv_config_create(&arena);
    csv_config_set_path(config, "data.csv");
    
    CSVReader *reader = csv_reader_init_with_config(&arena, config);
    
    // Get current position
    long position = csv_reader_get_position(reader);
    printf("Current position: %ld\n", position);
    
    // Seek to specific position
    if (csv_reader_seek(reader, 1000) == 0) {
        CSVRecord *record = csv_reader_next_record(reader);
        if (record) {
            printf("Record at position 1000: %s\n", record->fields[0]);
        }
    }
    
    // Rewind to beginning
    csv_reader_rewind(reader);
    
    csv_reader_free(reader);
    arena_destroy(&arena);
    return 0;
}
```

## Next Steps

Now that you know the basics, explore more advanced features:

- [API Reference](/docs/fastcsv-c/api-reference) - Complete function documentation
- [Examples](/docs/fastcsv-c/examples) - Real-world usage scenarios
- [GitHub Repository](https://github.com/csvtoolkit/FastCSV-C) - Source code and issues 