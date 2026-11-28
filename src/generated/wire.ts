// Generated from the pinned public OpenAPI. Run npm run generate.
import type { OperationShape, WireShape } from "../wire-schema.js";

export const operations: Readonly<Record<string, OperationShape>> = {
  "GET /health": {
    "authentication": "anonymous",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {},
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "object",
            "properties": {
              "build_commit": {
                "kind": "string"
              },
              "status": {
                "kind": "string"
              }
            }
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /ready": {
    "authentication": "anonymous",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {},
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "object",
            "properties": {
              "status": {
                "kind": "string"
              }
            }
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {
          "application/json": {
            "kind": "object",
            "properties": {
              "status": {
                "kind": "string"
              }
            }
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/auth/context": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/AuthContext"
          }
        },
        "headers": {
          "Cache-Control": {
            "kind": "string"
          },
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "421": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/classification-codes/{scheme}/{code}": {
    "authentication": "anonymous",
    "bodyRequired": false,
    "requiredParameters": [
      "path:code",
      "path:scheme"
    ],
    "request": {},
    "parameters": {
      "path:code": {
        "kind": "string"
      },
      "path:scheme": {
        "kind": "string"
      },
      "query:catalog_version": {
        "kind": "string"
      },
      "query:legal_date": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ClassificationInformationalCode"
          }
        },
        "headers": {
          "Cache-Control": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "429": {
        "content": {},
        "headers": {}
      },
      "503": {
        "content": {},
        "headers": {}
      }
    }
  },
  "GET /v1/compliance/threshold-status": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ComplianceStatusResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/information/customer-vat/article59c": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:year"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:year": {
        "kind": "integer",
        "minimum": "2000"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerAnnualArticle59c"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/information/customer-vat/attention": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerVATAttentionResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/information/customer-vat/events": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:country": {
        "kind": "string"
      },
      "query:cursor": {
        "kind": "string"
      },
      "query:event_id": {
        "kind": "string"
      },
      "query:limit": {
        "kind": "integer",
        "minimum": "1",
        "maximum": "200"
      },
      "query:pending_only": {
        "kind": "boolean"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerVATEventsResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/information/customer-vat/ioss": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:format": {
        "kind": "string"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerIOSSReport"
          },
          "text/csv": {
            "kind": "bytes"
          }
        },
        "headers": {
          "Content-Disposition": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/information/customer-vat/oss": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:format": {
        "kind": "string"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerOSSReport"
          },
          "text/csv": {
            "kind": "bytes"
          }
        },
        "headers": {
          "Content-Disposition": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/information/customer-vat/rules": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerVATRulesResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/information/vat": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:code",
      "query:country",
      "query:date",
      "query:scheme"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:catalog_version": {
        "kind": "string"
      },
      "query:code": {
        "kind": "string"
      },
      "query:country": {
        "kind": "string"
      },
      "query:date": {
        "kind": "string"
      },
      "query:scheme": {
        "kind": "string"
      },
      "query:snapshot_id": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/InformationalVATResult"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/reports/country-vat-breakdown": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/OSSCountryVATBreakdownResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/reports/country-vat-breakdown/export": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:format",
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:format": {
        "kind": "string"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/OSSCountryVATBreakdownExportResponse"
          },
          "text/csv": {
            "kind": "bytes"
          }
        },
        "headers": {
          "Content-Disposition": {
            "kind": "string"
          },
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/reports/filing-prep": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/OSSFilingPrepResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/reports/locked-return-periods/union-oss": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/UnionOSSLockedReturnPeriodListResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/reports/locked-return-periods/union-oss/exports/{exportID}": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "path:exportID"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "path:exportID": {
        "kind": "integer",
        "minimum": "1"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "bytes"
          },
          "text/csv": {
            "kind": "bytes"
          }
        },
        "headers": {
          "Content-Disposition": {
            "kind": "string"
          },
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/reports/multi-jurisdiction": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/OSSMultiJurisdictionReportResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/reports/oss-accountant-report": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/OSSAccountantReportResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/reports/oss-quarterly-summary": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/OSSQuarterlySummaryResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/reports/oss-quarterly-summary/export": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:format",
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:format": {
        "kind": "string"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/OSSQuarterlySummaryExportResponse"
          },
          "text/csv": {
            "kind": "bytes"
          }
        },
        "headers": {
          "Content-Disposition": {
            "kind": "string"
          },
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/sources": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/SourceProfilesResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/sources/unknown": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:limit": {
        "kind": "integer",
        "minimum": "1",
        "maximum": "500"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/UnknownSourcesResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/supplies": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:classification_status": {
        "kind": "string"
      },
      "query:country": {
        "kind": "string"
      },
      "query:currency": {
        "kind": "string"
      },
      "query:cursor": {
        "kind": "string"
      },
      "query:event_id": {
        "kind": "string"
      },
      "query:from": {
        "kind": "string"
      },
      "query:limit": {
        "kind": "integer",
        "minimum": "1",
        "maximum": "200"
      },
      "query:order_id": {
        "kind": "string"
      },
      "query:rate_category": {
        "kind": "string"
      },
      "query:source_id": {
        "kind": "string"
      },
      "query:source_profile_id": {
        "kind": "string"
      },
      "query:to": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "object",
            "properties": {
              "items": {
                "kind": "array",
                "items": {
                  "kind": "ref",
                  "name": "#/components/schemas/CommittedSupplyRecord"
                }
              },
              "next_cursor": {
                "kind": "string"
              }
            }
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/supplies/{id}": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "path:id"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "path:id": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CommittedSupplyRecord"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/tax-classes": {
    "authentication": "anonymous",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "query:at": {
        "kind": "string"
      },
      "query:country": {
        "kind": "string"
      },
      "query:group": {
        "kind": "string"
      },
      "query:q": {
        "kind": "string"
      },
      "query:tag": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/TaxClassListResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      }
    }
  },
  "GET /v1/tax-classes/{id}": {
    "authentication": "anonymous",
    "bodyRequired": false,
    "requiredParameters": [
      "path:id"
    ],
    "request": {},
    "parameters": {
      "path:id": {
        "kind": "string"
      },
      "query:at": {
        "kind": "string"
      },
      "query:country": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/TaxClassDetailResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      }
    }
  },
  "GET /v1/tax-registrations": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/TaxRegistrationsResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/transactions": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:api_key_id": {
        "kind": "int64"
      },
      "query:country": {
        "kind": "string"
      },
      "query:currency": {
        "kind": "string"
      },
      "query:cursor": {
        "kind": "string"
      },
      "query:from": {
        "kind": "string"
      },
      "query:limit": {
        "kind": "integer",
        "minimum": "1",
        "maximum": "500"
      },
      "query:source_id": {
        "kind": "string"
      },
      "query:source_profile_id": {
        "kind": "int64",
        "minimum": "1"
      },
      "query:tax_class_id": {
        "kind": "string"
      },
      "query:to": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/TransactionListResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/transactions/aggregated": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:api_key_id": {
        "kind": "int64"
      },
      "query:country": {
        "kind": "string"
      },
      "query:currency": {
        "kind": "string"
      },
      "query:from": {
        "kind": "string"
      },
      "query:group_by": {
        "kind": "string"
      },
      "query:source_id": {
        "kind": "string"
      },
      "query:source_profile_id": {
        "kind": "int64",
        "minimum": "1"
      },
      "query:to": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/AggregateResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/transactions/export": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:from",
      "query:to"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:api_key_id": {
        "kind": "int64"
      },
      "query:country": {
        "kind": "string"
      },
      "query:currency": {
        "kind": "string"
      },
      "query:export_version": {
        "kind": "integer"
      },
      "query:from": {
        "kind": "string"
      },
      "query:source_id": {
        "kind": "string"
      },
      "query:source_profile_id": {
        "kind": "int64",
        "minimum": "1"
      },
      "query:tax_class_id": {
        "kind": "string"
      },
      "query:to": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "text/csv; charset=utf-8": {
            "kind": "bytes"
          }
        },
        "headers": {
          "Content-Disposition": {
            "kind": "string"
          },
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/transactions/{id}": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "path:id"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "path:id": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/TransactionDetailResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/vat/rates": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:country",
      "query:tax_class_id"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:at": {
        "kind": "string"
      },
      "query:country": {
        "kind": "string"
      },
      "query:tax_class_id": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/VatRateResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/vat/sme-thresholds": {
    "authentication": "anonymous",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "query:country": {
        "kind": "string"
      },
      "query:date": {
        "kind": "string"
      },
      "query:taxName": {
        "kind": "string"
      },
      "query:tax_name": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/SmeThresholdsListResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          }
        }
      }
    }
  },
  "GET /v1/vat/thresholds": {
    "authentication": "anonymous",
    "bodyRequired": false,
    "requiredParameters": [],
    "request": {},
    "parameters": {
      "query:country": {
        "kind": "string"
      },
      "query:date": {
        "kind": "string"
      },
      "query:type": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ThresholdListResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      }
    }
  },
  "PATCH /v1/sources/{id}": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [
      "path:id"
    ],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/UpdateSourceProfileRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "path:id": {
        "kind": "int64",
        "minimum": "1"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/SourceProfile"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "PATCH /v1/tax-registrations/{id}": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [
      "path:id"
    ],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/UpdateTaxRegistrationRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "path:id": {
        "kind": "int64",
        "minimum": "1"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/TaxRegistration"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /agent/auth": {
    "authentication": "anonymous",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "object",
        "properties": {
          "account_id": {
            "kind": "string"
          },
          "agent_name": {
            "kind": "string"
          },
          "requested_credential_type": {
            "kind": "string"
          },
          "type": {
            "kind": "string"
          }
        }
      }
    },
    "parameters": {},
    "responses": {
      "202": {
        "content": {
          "application/json": {
            "kind": "object",
            "properties": {
              "claim_token": {
                "kind": "string"
              },
              "environment": {
                "kind": "string"
              },
              "expires_in": {
                "kind": "integer"
              },
              "interval": {
                "kind": "integer"
              },
              "registration_id": {
                "kind": "string"
              },
              "scopes": {
                "kind": "array",
                "items": {
                  "kind": "string"
                }
              },
              "verification_uri": {
                "kind": "string"
              }
            }
          }
        },
        "headers": {
          "Cache-Control": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {},
        "headers": {}
      },
      "404": {
        "content": {},
        "headers": {}
      },
      "421": {
        "content": {},
        "headers": {}
      },
      "429": {
        "content": {},
        "headers": {}
      },
      "500": {
        "content": {},
        "headers": {}
      }
    }
  },
  "POST /agent/auth/claim": {
    "authentication": "claim_token",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "object",
        "properties": {
          "claim_token": {
            "kind": "string"
          }
        }
      }
    },
    "parameters": {},
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "object",
            "properties": {
              "api_key": {
                "kind": "string"
              },
              "credential_type": {
                "kind": "string"
              },
              "environment": {
                "kind": "string"
              },
              "expires_at": {
                "kind": "string"
              },
              "scopes": {
                "kind": "array",
                "items": {
                  "kind": "string"
                }
              }
            }
          }
        },
        "headers": {
          "Cache-Control": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {},
        "headers": {}
      },
      "403": {
        "content": {},
        "headers": {}
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          }
        }
      },
      "421": {
        "content": {},
        "headers": {}
      },
      "429": {
        "content": {},
        "headers": {}
      },
      "500": {
        "content": {},
        "headers": {}
      }
    }
  },
  "POST /v1/information/customer-vat/classification": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATClassificationRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerVATResult"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/information/customer-vat/oss-context": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSContextRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerOSSContextSaveResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/information/customer-vat/provisional-rate": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "object",
        "properties": {
          "effective_to": {
            "kind": "string"
          },
          "event_id": {
            "kind": "string"
          },
          "expected_revision": {
            "kind": "integer",
            "minimum": "0"
          },
          "rate_bps": {
            "kind": "integer",
            "minimum": "1",
            "maximum": "10000"
          },
          "reason": {
            "kind": "string"
          }
        }
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerVATResult"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/information/customer-vat/reprocess": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATEventRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerVATResult"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/information/customer-vat/retire": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATRetireRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerVATRetireResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/information/customer-vat/select": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATSelectionRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CustomerVATResult"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/information/tax-class/resolve": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/InformationalVATQuery"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/InformationalVATResult"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "413": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/information/vat/calculate": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/InformationalVATCalculationRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "object",
            "properties": {
              "classification": {
                "kind": "object",
                "properties": {
                  "description": {
                    "kind": "string"
                  },
                  "display_code": {
                    "kind": "string"
                  },
                  "node_digest": {
                    "kind": "string"
                  },
                  "root_digest": {
                    "kind": "string"
                  },
                  "source_digest": {
                    "kind": "string"
                  },
                  "source_reference": {
                    "kind": "string"
                  },
                  "valid_from": {
                    "kind": "string"
                  },
                  "valid_to": {
                    "kind": "string"
                  },
                  "version": {
                    "kind": "string"
                  }
                }
              },
              "disclaimer": {
                "kind": "string"
              },
              "filing_ready": {
                "kind": "boolean"
              },
              "informational_only": {
                "kind": "boolean"
              },
              "legal_applicability": {
                "kind": "string"
              },
              "options": {
                "kind": "array",
                "items": {
                  "kind": "object",
                  "properties": {
                    "category": {
                      "kind": "string"
                    },
                    "conditions": {
                      "kind": "string"
                    },
                    "conditions_state": {
                      "kind": "string"
                    },
                    "match_kind": {
                      "kind": "string"
                    },
                    "matched_code": {
                      "kind": "string"
                    },
                    "option_id": {
                      "kind": "string"
                    },
                    "rate_bps": {
                      "kind": "int64",
                      "nullable": true,
                      "minimum": "0",
                      "maximum": "100000"
                    },
                    "source_ordinal": {
                      "kind": "integer"
                    },
                    "source_reported_date": {
                      "kind": "string"
                    },
                    "source_row_digest": {
                      "kind": "string"
                    },
                    "value_type": {
                      "kind": "string"
                    }
                  }
                }
              },
              "query": {
                "kind": "ref",
                "name": "#/components/schemas/InformationalVATQuery"
              },
              "schema_version": {
                "kind": "string"
              },
              "source": {
                "kind": "object",
                "properties": {
                  "canonical_sha256": {
                    "kind": "string"
                  },
                  "parser_version": {
                    "kind": "string"
                  },
                  "raw_sha256": {
                    "kind": "string"
                  },
                  "reference": {
                    "kind": "string"
                  },
                  "requested_from": {
                    "kind": "string"
                  },
                  "requested_to": {
                    "kind": "string"
                  },
                  "retrieved_at": {
                    "kind": "string"
                  },
                  "snapshot_id": {
                    "kind": "string"
                  }
                }
              },
              "source_assumptions": {
                "kind": "array",
                "items": {
                  "kind": "string"
                }
              },
              "status": {
                "kind": "string"
              },
              "warnings": {
                "kind": "array",
                "items": {
                  "kind": "string"
                }
              },
              "calculation": {
                "kind": "ref",
                "name": "#/components/schemas/InformationalVATCalculation"
              }
            }
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "413": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {},
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/reports/locked-return-periods/union-oss": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "201": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/UnionOSSLockedReturnPeriodResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/reports/locked-return-periods/union-oss/filed": {
    "authentication": "api_key",
    "bodyRequired": false,
    "requiredParameters": [
      "query:period"
    ],
    "request": {},
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "query:period": {
        "kind": "string"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/UnionOSSLockedReturnPeriodResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/sources": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/CreateSourceProfileRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "201": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/SourceProfile"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/supplies": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/CommittedSupplyInput"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CommittedSupplyReceipt"
          }
        },
        "headers": {
          "Location": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "201": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/CommittedSupplyReceipt"
          }
        },
        "headers": {
          "Location": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "413": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/tax-registrations": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/CreateTaxRegistrationRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "201": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/TaxRegistration"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/vat/calculate": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/VatCalculateRequest"
      }
    },
    "parameters": {
      "header:Idempotency-Key": {
        "kind": "string"
      },
      "header:X-Source-ID": {
        "kind": "string"
      },
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/VatCalculateResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "409": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "503": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  },
  "POST /v1/vat/sme-eligibility": {
    "authentication": "anonymous",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/SmeEligibilityRequest"
      }
    },
    "parameters": {},
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/SmeEligibilityResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "422": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {}
      }
    }
  },
  "POST /v1/vat/threshold-check": {
    "authentication": "api_key",
    "bodyRequired": true,
    "requiredParameters": [],
    "request": {
      "application/json": {
        "kind": "ref",
        "name": "#/components/schemas/ThresholdCheckRequest"
      }
    },
    "parameters": {
      "header:X-VAT-Expected-Context": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      }
    },
    "responses": {
      "200": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ThresholdCheckResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "400": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "401": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "403": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-Request-ID": {
            "kind": "string"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "404": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "422": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/Article59cEvidenceIncompleteResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "429": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "Retry-After": {
            "kind": "integer"
          },
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      },
      "500": {
        "content": {
          "application/json": {
            "kind": "ref",
            "name": "#/components/schemas/ErrorResponse"
          }
        },
        "headers": {
          "X-VAT-Environment": {
            "kind": "string"
          }
        }
      }
    }
  }
};

export const schemas: Readonly<Record<string, WireShape>> = {
  "#/components/schemas/AggregateResponse": {
    "kind": "object",
    "properties": {
      "converted_currencies": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "disclaimer": {
        "kind": "string"
      },
      "eur_only": {
        "kind": "boolean"
      },
      "group_by": {
        "kind": "string"
      },
      "period": {
        "kind": "object",
        "properties": {
          "from": {
            "kind": "string"
          },
          "to": {
            "kind": "string"
          }
        }
      },
      "rows": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/AggregateRow"
        }
      },
      "unconverted_currencies": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      }
    }
  },
  "#/components/schemas/AggregateRow": {
    "kind": "object",
    "properties": {
      "converted_currencies": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "eur_only": {
        "kind": "boolean"
      },
      "gross_amount_minor": {
        "kind": "int64"
      },
      "key": {
        "kind": "string"
      },
      "net_amount_minor": {
        "kind": "int64"
      },
      "transaction_count": {
        "kind": "int64"
      },
      "unconverted_currencies": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "vat_amount_minor": {
        "kind": "int64"
      }
    }
  },
  "#/components/schemas/Article59cCanonicalMoney": {
    "kind": "object",
    "properties": {
      "amount_minor": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "scale": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/Article59cCoverageGroup": {
    "kind": "object",
    "properties": {
      "disposition": {
        "kind": "string"
      },
      "event_count": {
        "kind": "string"
      },
      "evidence_quality": {
        "kind": "string"
      },
      "materiality": {
        "kind": "string"
      },
      "original_currency": {
        "kind": "string"
      },
      "reason_code": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/Article59cEvidenceIncompleteResponse": {
    "kind": "object",
    "properties": {
      "cutoff_at": {
        "kind": "string"
      },
      "error": {
        "kind": "string"
      },
      "evidence_status": {
        "kind": "string"
      },
      "issues": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      }
    }
  },
  "#/components/schemas/Article59cTreatmentTrigger": {
    "kind": "object",
    "properties": {
      "causal": {
        "kind": "boolean"
      },
      "dependency_digest": {
        "kind": "string"
      },
      "dependency_revision": {
        "kind": "string"
      },
      "effective_cessation_at": {
        "kind": "string"
      },
      "effective_from": {
        "kind": "string"
      },
      "kind": {
        "kind": "string"
      },
      "minimum_bound_through": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/AuthContext": {
    "kind": "object",
    "properties": {
      "context_id": {
        "kind": "ref",
        "name": "#/components/schemas/AuthContextID"
      },
      "environment": {
        "kind": "string"
      },
      "scopes": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      }
    }
  },
  "#/components/schemas/AuthContextID": {
    "kind": "string"
  },
  "#/components/schemas/CalculationProvenance": {
    "kind": "object",
    "properties": {
      "calculation_version": {
        "kind": "string"
      },
      "evidence_status": {
        "kind": "string"
      },
      "execution_digest": {
        "kind": "string"
      },
      "ownership": {
        "kind": "string"
      },
      "replay_status": {
        "kind": "string"
      },
      "schema_version": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/ClassificationCatalogBinding": {
    "kind": "object",
    "properties": {
      "catalog_digest": {
        "kind": "string"
      },
      "catalog_version": {
        "kind": "string"
      },
      "official_reference": {
        "kind": "string"
      },
      "valid_from": {
        "kind": "string"
      },
      "valid_to": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/ClassificationInformationalCode": {
    "kind": "object",
    "properties": {
      "catalog": {
        "kind": "ref",
        "name": "#/components/schemas/ClassificationCatalogBinding"
      },
      "display_code": {
        "kind": "string"
      },
      "exact_code": {
        "kind": "string"
      },
      "is_leaf": {
        "kind": "boolean"
      },
      "knowledge_time": {
        "kind": "string"
      },
      "official_description": {
        "kind": "string"
      },
      "schema_version": {
        "kind": "string"
      },
      "scheme": {
        "kind": "string"
      },
      "source_retrieved_at": {
        "kind": "string"
      },
      "source_sha256": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CommittedSupplyEventInput": {
    "kind": "object",
    "properties": {
      "arrival_country": {
        "kind": "string"
      },
      "classification": {
        "kind": "object",
        "properties": {
          "catalog_version": {
            "kind": "string"
          },
          "code": {
            "kind": "string"
          },
          "scheme": {
            "kind": "string"
          }
        }
      },
      "classification_reason": {
        "kind": "string"
      },
      "consignment_currency": {
        "kind": "string"
      },
      "consignment_currency_scale": {
        "kind": "integer",
        "minimum": "0",
        "maximum": "4"
      },
      "consignment_intrinsic_value_minor": {
        "kind": "int64",
        "minimum": "0"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "integer",
        "minimum": "0",
        "maximum": "4"
      },
      "customer_type": {
        "kind": "string"
      },
      "customs_declaration_items": {
        "kind": "array",
        "items": {
          "kind": "object",
          "properties": {
            "declaration_line_reference": {
              "kind": "string"
            },
            "description": {
              "kind": "string"
            },
            "origin_country": {
              "kind": "string"
            },
            "tariff_classification": {
              "kind": "string"
            }
          }
        }
      },
      "declared_payment_accepted_at": {
        "kind": "string"
      },
      "dispatch_country": {
        "kind": "string"
      },
      "event_type": {
        "kind": "string"
      },
      "event_version": {
        "kind": "int64",
        "minimum": "1"
      },
      "evidence": {
        "kind": "object",
        "properties": {}
      },
      "excise_goods": {
        "kind": "boolean"
      },
      "external_event_id": {
        "kind": "string"
      },
      "external_line_id": {
        "kind": "string"
      },
      "external_order_id": {
        "kind": "string"
      },
      "fixed_establishment_country": {
        "kind": "string"
      },
      "gross_amount_minor": {
        "kind": "int64"
      },
      "import_origin_country": {
        "kind": "string"
      },
      "is_assembly_or_installation": {
        "kind": "boolean"
      },
      "is_new_means_of_transport": {
        "kind": "boolean"
      },
      "marketplace_deemed_supplier": {
        "kind": "boolean"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "observed_tax_lines": {
        "kind": "array",
        "items": {
          "kind": "object",
          "properties": {
            "amount_minor": {
              "kind": "int64"
            },
            "derived": {
              "kind": "boolean"
            },
            "jurisdiction_country": {
              "kind": "string"
            },
            "kind": {
              "kind": "string"
            },
            "merchant_liable": {
              "kind": "boolean"
            },
            "origin": {
              "kind": "string"
            },
            "rate_bps": {
              "kind": "integer",
              "minimum": "0",
              "maximum": "100000"
            },
            "source_provider": {
              "kind": "string"
            },
            "source_title": {
              "kind": "string"
            }
          }
        }
      },
      "prices_include_tax": {
        "kind": "boolean"
      },
      "product_reference": {
        "kind": "string"
      },
      "source_vat_amount_minor": {
        "kind": "int64"
      },
      "supplier_establishment_country": {
        "kind": "string"
      },
      "supply_date": {
        "kind": "string"
      },
      "supply_kind": {
        "kind": "string"
      },
      "supply_occurred_at": {
        "kind": "string"
      },
      "taxable_amount_minor": {
        "kind": "int64"
      },
      "variant_reference": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CommittedSupplyInput": {
    "kind": "object",
    "properties": {
      "event": {
        "kind": "ref",
        "name": "#/components/schemas/CommittedSupplyEventInput"
      },
      "original_supply_event_id": {
        "kind": "string"
      },
      "source_profile_id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CommittedSupplyReceipt": {
    "kind": "object",
    "properties": {
      "event_type": {
        "kind": "string"
      },
      "event_version": {
        "kind": "string"
      },
      "id": {
        "kind": "string"
      },
      "provenance": {
        "kind": "string"
      },
      "result": {
        "kind": "string"
      },
      "source_id": {
        "kind": "string"
      },
      "source_profile_id": {
        "kind": "string"
      },
      "supply_date": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CommittedSupplyRecord": {
    "kind": "object",
    "properties": {
      "arrival_country": {
        "kind": "string"
      },
      "classification_reason": {
        "kind": "string"
      },
      "classification_status": {
        "kind": "string"
      },
      "created_at": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "integer"
      },
      "customer_type": {
        "kind": "string"
      },
      "dispatch_country": {
        "kind": "string"
      },
      "event_type": {
        "kind": "string"
      },
      "event_version": {
        "kind": "string"
      },
      "external_event_id": {
        "kind": "string"
      },
      "external_line_id": {
        "kind": "string"
      },
      "external_order_id": {
        "kind": "string"
      },
      "gross_amount_minor": {
        "kind": "string"
      },
      "id": {
        "kind": "string"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "original_supply_event_id": {
        "kind": "string"
      },
      "prices_include_tax": {
        "kind": "boolean"
      },
      "provenance": {
        "kind": "string"
      },
      "rate_category": {
        "kind": "string"
      },
      "source_id": {
        "kind": "string"
      },
      "source_profile_display_name": {
        "kind": "string"
      },
      "source_profile_id": {
        "kind": "string"
      },
      "source_vat_reported": {
        "kind": "boolean"
      },
      "supplier_establishment_country": {
        "kind": "string"
      },
      "supply_date": {
        "kind": "string"
      },
      "supply_kind": {
        "kind": "string"
      },
      "taxable_amount_minor": {
        "kind": "string"
      },
      "updated_at": {
        "kind": "string"
      },
      "vat_amount_minor": {
        "kind": "string"
      },
      "vat_engine_treatment": {
        "kind": "object",
        "properties": {
          "original_sale_event_id": {
            "kind": "string"
          },
          "provisional": {
            "kind": "boolean"
          },
          "rate_bps": {
            "kind": "integer"
          },
          "source_option_id": {
            "kind": "string"
          },
          "source_row_digest": {
            "kind": "string"
          },
          "source_snapshot_id": {
            "kind": "string"
          },
          "source_value_type": {
            "kind": "string"
          }
        }
      },
      "vat_processing_status": {
        "kind": "string"
      },
      "vat_rate_bps": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/ComplianceStatusResponse": {
    "kind": "object",
    "properties": {
      "article_59c_applicability_status": {
        "kind": "string"
      },
      "checks": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/ThresholdCheckResponse"
        }
      },
      "converted_currencies": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "current_year_blocking_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "current_year_candidate_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "current_year_coverage": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/Article59cCoverageGroup"
        }
      },
      "current_year_excluded_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "disclaimer": {
        "kind": "string"
      },
      "eur_only": {
        "kind": "boolean"
      },
      "evidence_status": {
        "kind": "string"
      },
      "filing_readiness": {
        "kind": "string"
      },
      "historical_crossing_proven": {
        "kind": "boolean"
      },
      "issues": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "legal_effective_date": {
        "kind": "string"
      },
      "period": {
        "kind": "object",
        "properties": {
          "from": {
            "kind": "string"
          },
          "to": {
            "kind": "string"
          }
        }
      },
      "preceding_year_blocking_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "preceding_year_candidate_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "preceding_year_coverage": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/Article59cCoverageGroup"
        }
      },
      "preceding_year_excluded_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "primary_treatment_driver": {
        "kind": "string"
      },
      "threshold_evidence_status": {
        "kind": "string"
      },
      "treatment_triggers": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/Article59cTreatmentTrigger"
        }
      },
      "unconverted_currencies": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      }
    }
  },
  "#/components/schemas/CreateSourceProfileRequest": {
    "kind": "object",
    "properties": {
      "active": {
        "kind": "boolean"
      },
      "aliases": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "channel_type": {
        "kind": "string"
      },
      "default_country": {
        "kind": "string"
      },
      "default_currency": {
        "kind": "string"
      },
      "dispatch_country": {
        "kind": "string"
      },
      "dispatched_without_supplier_installation_from": {
        "kind": "string"
      },
      "display_name": {
        "kind": "string"
      },
      "marketplace_deemed_supplier": {
        "kind": "boolean"
      },
      "platform": {
        "kind": "string"
      },
      "source_key": {
        "kind": "string"
      },
      "supplier_establishment_country": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CreateTaxRegistrationRequest": {
    "kind": "object",
    "properties": {
      "effective_from": {
        "kind": "string"
      },
      "effective_to": {
        "kind": "string"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "registration_identifier": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "status": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerAnnualArticle59c": {
    "kind": "object",
    "properties": {
      "applicability_reason": {
        "kind": "string"
      },
      "article_59c": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerArticle59c"
      },
      "as_of": {
        "kind": "string"
      },
      "coverage_status": {
        "kind": "string"
      },
      "customer_declarations": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSDeclarations"
      },
      "customer_declarations_revision": {
        "kind": "integer"
      },
      "disclaimer": {
        "kind": "string"
      },
      "exceeded_amount_minor": {
        "kind": "string"
      },
      "filing_ready": {
        "kind": "boolean"
      },
      "informational_only": {
        "kind": "boolean"
      },
      "issues": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSIssue"
        }
      },
      "observed_imported_amounts": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerObservedImported"
        }
      },
      "observed_progress_percent": {
        "kind": "string"
      },
      "previous_comparison": {
        "kind": "string"
      },
      "previous_year_scenario": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerPreviousYearScenario"
      },
      "progress_percent": {
        "kind": "string"
      },
      "qualifying_countries": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "quarters": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerArticle59cQuarter"
        }
      },
      "recent_qualifying_activity": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSActivity"
        }
      },
      "remaining_amount_minor": {
        "kind": "string"
      },
      "schema_version": {
        "kind": "string"
      },
      "simulated": {
        "kind": "boolean"
      },
      "year": {
        "kind": "integer"
      },
      "year_status": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerArticle59c": {
    "kind": "object",
    "properties": {
      "comparison": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "4"
      },
      "current_amount_minor": {
        "kind": "string"
      },
      "current_crossing": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerArticle59cCrossingEvidence"
      },
      "current_included_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "exceeded": {
        "kind": "boolean"
      },
      "excluded_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "previous_amount_minor": {
        "kind": "string"
      },
      "previous_crossing": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerArticle59cCrossingEvidence"
      },
      "previous_currency": {
        "kind": "string"
      },
      "previous_currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "4"
      },
      "previous_included_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "previous_threshold_amount_minor": {
        "kind": "string"
      },
      "threshold_amount_minor": {
        "kind": "string"
      },
      "unresolved_count": {
        "kind": "integer",
        "minimum": "0"
      }
    }
  },
  "#/components/schemas/CustomerArticle59cCrossingEvidence": {
    "kind": "object",
    "properties": {
      "cumulative_after": {
        "kind": "ref",
        "name": "#/components/schemas/Article59cCanonicalMoney"
      },
      "cumulative_before": {
        "kind": "ref",
        "name": "#/components/schemas/Article59cCanonicalMoney"
      },
      "semantic_evidence_digest": {
        "kind": "string"
      },
      "source_event_time": {
        "kind": "string"
      },
      "source_revision_id": {
        "kind": "string"
      },
      "supply_event_id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerArticle59cQuarter": {
    "kind": "object",
    "properties": {
      "event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "excluded_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "from": {
        "kind": "string"
      },
      "included_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "net_amount_minor": {
        "kind": "string"
      },
      "period": {
        "kind": "string"
      },
      "state": {
        "kind": "string"
      },
      "through": {
        "kind": "string"
      },
      "unresolved_count": {
        "kind": "integer",
        "minimum": "0"
      }
    }
  },
  "#/components/schemas/CustomerIOSSReport": {
    "kind": "object",
    "properties": {
      "as_of": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "excluded_source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "filing_ready": {
        "kind": "boolean"
      },
      "included_source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "informational_only": {
        "kind": "boolean"
      },
      "issues": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSIssue"
        }
      },
      "period": {
        "kind": "string"
      },
      "period_open": {
        "kind": "boolean"
      },
      "report_mode": {
        "kind": "string"
      },
      "rows": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerIOSSRow"
        }
      },
      "schema_version": {
        "kind": "string"
      },
      "simulated": {
        "kind": "boolean"
      },
      "source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "submitted": {
        "kind": "boolean"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/CustomerIOSSRow": {
    "kind": "object",
    "properties": {
      "member_state_consumption": {
        "kind": "string"
      },
      "original_month": {
        "kind": "string"
      },
      "rate_category": {
        "kind": "string"
      },
      "source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "source_provenances": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "taxable_amount_minor": {
        "kind": "string"
      },
      "vat_amount_minor": {
        "kind": "string"
      },
      "vat_rate_bps": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/CustomerOSSActivity": {
    "kind": "object",
    "properties": {
      "country": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "6"
      },
      "date": {
        "kind": "string"
      },
      "event_id": {
        "kind": "string"
      },
      "event_type": {
        "kind": "string"
      },
      "net_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSApplicabilityFact": {
    "kind": "object",
    "properties": {
      "classification": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATCatalogClassification"
      },
      "provenance": {
        "kind": "string"
      },
      "source_profile": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSInstallationSourceProfile"
      },
      "value": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/CustomerOSSContextRequest": {
    "kind": "object",
    "properties": {
      "coverage_through": {
        "kind": "string"
      },
      "destination_taxation_option_from": {
        "kind": "string"
      },
      "establishment_country": {
        "kind": "string"
      },
      "previous_year_assumption": {
        "kind": "object",
        "properties": {
          "currency": {
            "kind": "string"
          },
          "net_amount": {
            "kind": "string"
          }
        }
      },
      "previous_year_complete": {
        "kind": "boolean"
      },
      "revision": {
        "kind": "integer",
        "minimum": "0"
      },
      "sole_establishment": {
        "kind": "boolean"
      },
      "source_coverage_declared": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/CustomerOSSContextSaveResponse": {
    "kind": "object",
    "properties": {
      "customer_declared": {
        "kind": "boolean"
      },
      "saved": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/CustomerOSSCoverageSource": {
    "kind": "object",
    "properties": {
      "applicable_from": {
        "kind": "string"
      },
      "automatic_since": {
        "kind": "string"
      },
      "connection_id": {
        "kind": "int64"
      },
      "coverage_evidence": {
        "kind": "string"
      },
      "covered_through": {
        "kind": "string"
      },
      "key": {
        "kind": "string"
      },
      "label": {
        "kind": "string"
      },
      "method": {
        "kind": "string"
      },
      "observed_at": {
        "kind": "string"
      },
      "reason": {
        "kind": "string"
      },
      "required_through": {
        "kind": "string"
      },
      "revision": {
        "kind": "integer"
      },
      "status": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSDeclarations": {
    "kind": "object",
    "properties": {
      "coverage_through": {
        "kind": "string"
      },
      "destination_taxation_option_from": {
        "kind": "string"
      },
      "establishment_country": {
        "kind": "string"
      },
      "previous_year_assumption": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerPreviousYearAssumption"
      },
      "previous_year_complete": {
        "kind": "boolean"
      },
      "revision": {
        "kind": "integer"
      },
      "sole_establishment": {
        "kind": "boolean"
      },
      "source_coverage_declared": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/CustomerOSSDistanceSaleFacts": {
    "kind": "object",
    "properties": {
      "assembly_or_installation": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSApplicabilityFact"
      },
      "new_means_of_transport": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSApplicabilityFact"
      }
    }
  },
  "#/components/schemas/CustomerOSSEvidenceReference": {
    "kind": "object",
    "properties": {
      "digest": {
        "kind": "string"
      },
      "id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSFilingAccountEvidence": {
    "kind": "object",
    "properties": {
      "coverage_through": {
        "kind": "string"
      },
      "destination_election_from": {
        "kind": "string"
      },
      "establishment_country": {
        "kind": "string"
      },
      "previous_year_complete": {
        "kind": "boolean"
      },
      "revision": {
        "kind": "integer"
      },
      "sole_establishment": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/CustomerOSSFilingBlocker": {
    "kind": "object",
    "properties": {
      "destination": {
        "kind": "string"
      },
      "distance_sale_facts": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSDistanceSaleFacts"
      },
      "event_id": {
        "kind": "string"
      },
      "filing_disposition": {
        "kind": "string"
      },
      "order": {
        "kind": "string"
      },
      "reasons": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSIssue"
        }
      },
      "reconciliation_state": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSFilingCalculationEvidence": {
    "kind": "object",
    "properties": {
      "history_id": {
        "kind": "string"
      },
      "input_digest": {
        "kind": "string"
      },
      "legal_applicability": {
        "kind": "string"
      },
      "option_id": {
        "kind": "string"
      },
      "rate_bps": {
        "kind": "int64"
      },
      "requested_from": {
        "kind": "string"
      },
      "requested_to": {
        "kind": "string"
      },
      "rule_id": {
        "kind": "string"
      },
      "rule_revision": {
        "kind": "integer"
      },
      "snapshot_digest": {
        "kind": "string"
      },
      "snapshot_id": {
        "kind": "string"
      },
      "source_reported_on": {
        "kind": "string"
      },
      "source_row_digest": {
        "kind": "string"
      },
      "source_row_id": {
        "kind": "string"
      },
      "source_row_ordinal": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/CustomerOSSFilingClassificationEvidence": {
    "kind": "object",
    "properties": {
      "decision": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSEvidenceReference"
      },
      "tax_class": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSFilingDecisionEvidence": {
    "kind": "object",
    "properties": {
      "dependency_snapshot": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSEvidenceReference"
      },
      "expected_treatment": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSEvidenceReference"
      },
      "reconciliation": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSEvidenceReference"
      }
    }
  },
  "#/components/schemas/CustomerOSSFilingEvidence": {
    "kind": "object",
    "properties": {
      "account_declaration": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSFilingAccountEvidence"
      },
      "calculation": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSFilingCalculationEvidence"
      },
      "calculation_reference_status": {
        "kind": "string"
      },
      "catalog_classification": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATCatalogClassification"
      },
      "distance_sale_facts": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSDistanceSaleFacts"
      },
      "event_id": {
        "kind": "string"
      },
      "filing_classification": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSFilingClassificationEvidence"
      },
      "formal_decision": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSFilingDecisionEvidence"
      },
      "installation_declaration": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSInstallationSourceProfile"
      },
      "order": {
        "kind": "string"
      },
      "original_event_id": {
        "kind": "string"
      },
      "product": {
        "kind": "string"
      },
      "registration": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSFilingRegistrationEvidence"
      },
      "source_amounts": {
        "kind": "string"
      },
      "source_revision": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSEvidenceReference"
      },
      "supply_date": {
        "kind": "string"
      },
      "variant": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSFilingRegistrationEvidence": {
    "kind": "object",
    "properties": {
      "covered_through": {
        "kind": "string"
      },
      "effective_from": {
        "kind": "string"
      },
      "member_state": {
        "kind": "string"
      },
      "registration_id": {
        "kind": "int64"
      },
      "revision": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSEvidenceReference"
      }
    }
  },
  "#/components/schemas/CustomerOSSFilingReview": {
    "kind": "object",
    "properties": {
      "blocked_events": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSFilingBlocker"
        }
      },
      "evidence": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSFilingEvidence"
        }
      },
      "ready_event_count": {
        "kind": "integer",
        "minimum": "0"
      }
    }
  },
  "#/components/schemas/CustomerOSSFormalAuthorityReadiness": {
    "kind": "object",
    "properties": {
      "reasons": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "status": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSInstallationSourceProfile": {
    "kind": "object",
    "properties": {
      "effective_from": {
        "kind": "string"
      },
      "id": {
        "kind": "int64"
      },
      "reference": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSEvidenceReference"
      },
      "revision": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/CustomerOSSIssue": {
    "kind": "object",
    "properties": {
      "action": {
        "kind": "string"
      },
      "category": {
        "kind": "string"
      },
      "code": {
        "kind": "string"
      },
      "event_id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSPreparation": {
    "kind": "object",
    "properties": {
      "blocker_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "events": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSPreparationEvent"
        }
      },
      "formal_authority_readiness": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSFormalAuthorityReadiness"
      },
      "preparation_readiness": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSPreparationReadiness"
      }
    }
  },
  "#/components/schemas/CustomerOSSPreparationAmounts": {
    "kind": "object",
    "properties": {
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "6"
      },
      "gross_amount_minor": {
        "kind": "string"
      },
      "net_amount_minor": {
        "kind": "string"
      },
      "vat_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSPreparationEvent": {
    "kind": "object",
    "properties": {
      "calculated_amounts": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSPreparationAmounts"
      },
      "destination": {
        "kind": "string"
      },
      "event_id": {
        "kind": "string"
      },
      "formal_authority_readiness": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSFormalAuthorityReadiness"
      },
      "order": {
        "kind": "string"
      },
      "oss_applicability": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerUnionOSSOutcome"
      },
      "preparation_readiness": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSPreparationReadiness"
      },
      "rate_provenance": {
        "kind": "string"
      },
      "registration_id": {
        "kind": "int64"
      },
      "source_amounts": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSPreparationAmounts"
      },
      "source_provenance": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSPreparationReadiness": {
    "kind": "object",
    "properties": {
      "reasons": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "status": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSReport": {
    "kind": "object",
    "properties": {
      "article_59c": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerArticle59c"
      },
      "as_of": {
        "kind": "string"
      },
      "coverage_status": {
        "kind": "string"
      },
      "customer_declarations": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSDeclarations"
      },
      "customer_declarations_revision": {
        "kind": "integer"
      },
      "disclaimer": {
        "kind": "string"
      },
      "filing_ready": {
        "kind": "boolean"
      },
      "informational_only": {
        "kind": "boolean"
      },
      "issues": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSIssue"
        }
      },
      "observed_imported_amounts": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerObservedImported"
        }
      },
      "operational_estimate": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOperationalEstimate"
      },
      "oss_preparation": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSPreparation"
      },
      "period": {
        "kind": "string"
      },
      "period_open": {
        "kind": "boolean"
      },
      "provisional_amounts": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerProvisionalAmount"
        }
      },
      "provisional_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "qualifying_countries": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "quarters": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerArticle59cQuarter"
        }
      },
      "recent_qualifying_activity": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSActivity"
        }
      },
      "registration_status": {
        "kind": "string"
      },
      "report_mode": {
        "kind": "string"
      },
      "return_status": {
        "kind": "string"
      },
      "schema_version": {
        "kind": "string"
      },
      "simulated": {
        "kind": "boolean"
      },
      "source_coverage": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSSourceCoverage"
      },
      "submitted": {
        "kind": "boolean"
      },
      "summary": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerUnionOSSSummary"
      },
      "union_oss_filing_review": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOSSFilingReview"
      },
      "union_oss_supply_outcomes": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSScopeCount"
        }
      }
    }
  },
  "#/components/schemas/CustomerOSSScopeCount": {
    "kind": "object",
    "properties": {
      "event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "reason": {
        "kind": "string"
      },
      "status": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOSSSourceCoverage": {
    "kind": "object",
    "properties": {
      "covered_through": {
        "kind": "string"
      },
      "current_complete": {
        "kind": "boolean"
      },
      "previous_year_complete": {
        "kind": "boolean"
      },
      "requested_through": {
        "kind": "string"
      },
      "sources": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOSSCoverageSource"
        }
      }
    }
  },
  "#/components/schemas/CustomerObservedImported": {
    "kind": "object",
    "properties": {
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "6"
      },
      "event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "net_amount_minor": {
        "kind": "string"
      },
      "year": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/CustomerOperationalAmount": {
    "kind": "object",
    "properties": {
      "gross_amount_minor": {
        "kind": "string"
      },
      "net_amount_minor": {
        "kind": "string"
      },
      "source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "vat_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOperationalBreakdown": {
    "kind": "object",
    "properties": {
      "country": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "6"
      },
      "event_type": {
        "kind": "string"
      },
      "gross_amount_minor": {
        "kind": "string"
      },
      "net_amount_minor": {
        "kind": "string"
      },
      "original_period": {
        "kind": "string"
      },
      "rate_bps": {
        "kind": "integer"
      },
      "rate_provenance": {
        "kind": "string"
      },
      "source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "vat_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOperationalCurrency": {
    "kind": "object",
    "properties": {
      "calculated_adjustments": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOperationalAmount"
      },
      "combined": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOperationalAmount"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "6"
      },
      "imported": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOperationalAmount"
      },
      "imported_adjustments": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOperationalAmount"
      },
      "imported_sales": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOperationalAmount"
      },
      "provisional": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOperationalAmount"
      },
      "source_backed": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOperationalAmount"
      },
      "unresolved": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerOperationalAmount"
      }
    }
  },
  "#/components/schemas/CustomerOperationalDefaultScope": {
    "kind": "object",
    "properties": {
      "country": {
        "kind": "string"
      },
      "customer_type": {
        "kind": "string"
      },
      "effective_from": {
        "kind": "string"
      },
      "integration_id": {
        "kind": "int64"
      },
      "sale_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "store": {
        "kind": "string"
      },
      "supply_kind": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerOperationalEstimate": {
    "kind": "object",
    "properties": {
      "breakdown": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOperationalBreakdown"
        }
      },
      "currencies": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOperationalCurrency"
        }
      },
      "default_scopes": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerOperationalDefaultScope"
        }
      }
    }
  },
  "#/components/schemas/CustomerPreviousYearAssumption": {
    "kind": "object",
    "properties": {
      "currency": {
        "kind": "string"
      },
      "net_amount": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerPreviousYearScenario": {
    "kind": "object",
    "properties": {
      "comparison": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "4"
      },
      "net_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerProvisionalAmount": {
    "kind": "object",
    "properties": {
      "country": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "6"
      },
      "net_amount_minor": {
        "kind": "string"
      },
      "rate_bps": {
        "kind": "integer"
      },
      "source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "vat_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerUnionOSSOutcome": {
    "kind": "object",
    "properties": {
      "reason": {
        "kind": "string"
      },
      "status": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerUnionOSSSummary": {
    "kind": "object",
    "properties": {
      "balances": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerUnionOSSSummaryBalance"
        }
      },
      "corrections": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerUnionOSSSummaryCorrection"
        }
      },
      "excluded_source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "included_source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "rows": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerUnionOSSSummaryRow"
        }
      },
      "scheme_type": {
        "kind": "string"
      },
      "total_source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerUnionOSSSummaryTotals"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/CustomerUnionOSSSummaryBalance": {
    "kind": "object",
    "properties": {
      "correction_vat_amount_minor": {
        "kind": "string"
      },
      "current_vat_amount_minor": {
        "kind": "string"
      },
      "included_in_payable_total": {
        "kind": "boolean"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "vat_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerUnionOSSSummaryCorrection": {
    "kind": "object",
    "properties": {
      "member_state_consumption": {
        "kind": "string"
      },
      "original_period_key": {
        "kind": "string"
      },
      "source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "vat_correction_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerUnionOSSSummaryRow": {
    "kind": "object",
    "properties": {
      "dispatch_country": {
        "kind": "string"
      },
      "fixed_establishment_country": {
        "kind": "string"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "return_rate_category": {
        "kind": "string"
      },
      "return_section": {
        "kind": "string"
      },
      "source_event_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "supply_kind": {
        "kind": "string"
      },
      "taxable_amount_minor": {
        "kind": "string"
      },
      "vat_amount_minor": {
        "kind": "string"
      },
      "vat_rate_bps": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/CustomerUnionOSSSummaryTotals": {
    "kind": "object",
    "properties": {
      "correction_vat_amount_minor": {
        "kind": "string"
      },
      "current_vat_amount_minor": {
        "kind": "string"
      },
      "taxable_amount_minor": {
        "kind": "string"
      },
      "vat_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATAttentionResponse": {
    "kind": "object",
    "properties": {
      "has_more": {
        "kind": "boolean"
      },
      "pending_count": {
        "kind": "integer",
        "minimum": "0",
        "maximum": "100"
      }
    }
  },
  "#/components/schemas/CustomerVATCalculation": {
    "kind": "object",
    "properties": {
      "assumptions": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "calculator_version": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "4"
      },
      "declared_attributes": {
        "kind": "object",
        "properties": {},
        "additional": {
          "kind": "string"
        }
      },
      "gross_amount_minor": {
        "kind": "string"
      },
      "net_amount_minor": {
        "kind": "string"
      },
      "option_id": {
        "kind": "string"
      },
      "persistence": {
        "kind": "string"
      },
      "rate_bps": {
        "kind": "int64"
      },
      "vat_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATCatalogClassification": {
    "kind": "object",
    "properties": {
      "catalog_digest": {
        "kind": "string"
      },
      "catalog_version": {
        "kind": "string"
      },
      "code": {
        "kind": "string"
      },
      "date": {
        "kind": "string"
      },
      "node_digest": {
        "kind": "string"
      },
      "provenance": {
        "kind": "string"
      },
      "scheme": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATClassificationCandidate": {
    "kind": "object",
    "properties": {
      "catalog_version": {
        "kind": "string"
      },
      "code": {
        "kind": "string"
      },
      "description": {
        "kind": "string"
      },
      "scheme": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATClassificationRequest": {
    "kind": "object",
    "properties": {
      "catalog_version": {
        "kind": "string"
      },
      "code": {
        "kind": "string"
      },
      "event_id": {
        "kind": "string"
      },
      "scheme": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATDeclaredFacts": {
    "kind": "object",
    "properties": {
      "customer_type": {
        "kind": "string"
      },
      "destination_country": {
        "kind": "string"
      },
      "revision": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/CustomerVATDeclaredGoods": {
    "kind": "object",
    "properties": {
      "excise_goods": {
        "kind": "boolean"
      },
      "is_assembly_or_installation": {
        "kind": "boolean"
      },
      "is_new_means_of_transport": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/CustomerVATDisplay": {
    "kind": "object",
    "properties": {
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "6"
      },
      "gross_amount_minor": {
        "kind": "string"
      },
      "net_amount_minor": {
        "kind": "string"
      },
      "order_name": {
        "kind": "string"
      },
      "product_title": {
        "kind": "string"
      },
      "store_default_from": {
        "kind": "string"
      },
      "vat_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATEngineTreatment": {
    "kind": "object",
    "properties": {
      "original_sale_event_id": {
        "kind": "string"
      },
      "provisional": {
        "kind": "boolean"
      },
      "rate_bps": {
        "kind": "int64"
      },
      "source_option_id": {
        "kind": "string"
      },
      "source_row_digest": {
        "kind": "string"
      },
      "source_snapshot_id": {
        "kind": "string"
      },
      "source_value_type": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATEvent": {
    "kind": "object",
    "properties": {
      "authenticated_shopify_payment": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATHistoricalShopifyPayment"
      },
      "authenticated_source_time": {
        "kind": "string"
      },
      "consignment_currency": {
        "kind": "string"
      },
      "consignment_currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "6"
      },
      "consignment_intrinsic_value_minor": {
        "kind": "int64"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "6"
      },
      "customer_type": {
        "kind": "string"
      },
      "declared_facts": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATDeclaredFacts"
      },
      "declared_goods": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATDeclaredGoods"
      },
      "declared_payment_accepted_at": {
        "kind": "string"
      },
      "declared_supply_occurred_at": {
        "kind": "string"
      },
      "dispatch_country": {
        "kind": "string"
      },
      "event_type": {
        "kind": "string"
      },
      "excise_goods": {
        "kind": "boolean"
      },
      "external_line_id": {
        "kind": "string"
      },
      "external_order_id": {
        "kind": "string"
      },
      "fixed_establishment_country": {
        "kind": "string"
      },
      "gross_amount_minor": {
        "kind": "int64"
      },
      "id": {
        "kind": "string"
      },
      "import_origin_country": {
        "kind": "string"
      },
      "integration_id": {
        "kind": "int64"
      },
      "is_assembly_or_installation": {
        "kind": "boolean"
      },
      "is_new_means_of_transport": {
        "kind": "boolean"
      },
      "marketplace_deemed_supplier": {
        "kind": "boolean"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "original_supply_event_id": {
        "kind": "string"
      },
      "price_includes_vat": {
        "kind": "boolean"
      },
      "source_digest": {
        "kind": "string"
      },
      "source_profile_id": {
        "kind": "int64"
      },
      "source_provenance": {
        "kind": "string"
      },
      "source_record_id": {
        "kind": "string"
      },
      "supplier_establishment_country": {
        "kind": "string"
      },
      "supply_date": {
        "kind": "string"
      },
      "supply_kind": {
        "kind": "string"
      },
      "taxable_amount_minor": {
        "kind": "int64"
      }
    }
  },
  "#/components/schemas/CustomerVATEventRequest": {
    "kind": "object",
    "properties": {
      "event_id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATEventsResponse": {
    "kind": "object",
    "properties": {
      "events": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerVATResult"
        }
      },
      "filing_ready": {
        "kind": "boolean"
      },
      "filters": {
        "kind": "object",
        "properties": {
          "country": {
            "kind": "string"
          },
          "period": {
            "kind": "string"
          }
        }
      },
      "informational_only": {
        "kind": "boolean"
      },
      "next_cursor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATHistoricalShopifyClassification": {
    "kind": "object",
    "properties": {
      "evidence": {
        "kind": "string"
      },
      "jurisdiction": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATHistoricalShopifyPayment": {
    "kind": "object",
    "properties": {
      "accepted_at": {
        "kind": "string"
      },
      "issue": {
        "kind": "string"
      },
      "order_id": {
        "kind": "string"
      },
      "parent_transaction_id": {
        "kind": "string"
      },
      "provider": {
        "kind": "string"
      },
      "transaction_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "transaction_id": {
        "kind": "string"
      },
      "transaction_kind": {
        "kind": "string"
      },
      "transaction_status": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATInformation": {
    "kind": "object",
    "properties": {
      "classification": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATInformationClassification"
      },
      "disclaimer": {
        "kind": "string"
      },
      "filing_ready": {
        "kind": "boolean"
      },
      "informational_only": {
        "kind": "boolean"
      },
      "legal_applicability": {
        "kind": "string"
      },
      "options": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerVATInformationOption"
        }
      },
      "query": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATInformationQuery"
      },
      "schema_version": {
        "kind": "string"
      },
      "source": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATInformationSource"
      },
      "source_assumptions": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "status": {
        "kind": "string"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      }
    }
  },
  "#/components/schemas/CustomerVATInformationClassification": {
    "kind": "object",
    "properties": {
      "description": {
        "kind": "string"
      },
      "display_code": {
        "kind": "string"
      },
      "node_digest": {
        "kind": "string"
      },
      "root_digest": {
        "kind": "string"
      },
      "source_digest": {
        "kind": "string"
      },
      "source_reference": {
        "kind": "string"
      },
      "valid_from": {
        "kind": "string"
      },
      "valid_to": {
        "kind": "string"
      },
      "version": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATInformationOption": {
    "kind": "object",
    "properties": {
      "category": {
        "kind": "string"
      },
      "conditions": {
        "kind": "string"
      },
      "conditions_state": {
        "kind": "string"
      },
      "match_kind": {
        "kind": "string"
      },
      "matched_code": {
        "kind": "string"
      },
      "option_id": {
        "kind": "string"
      },
      "rate_bps": {
        "kind": "int64",
        "nullable": true
      },
      "source_ordinal": {
        "kind": "integer"
      },
      "source_reported_date": {
        "kind": "string"
      },
      "source_row_digest": {
        "kind": "string"
      },
      "value_type": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATInformationQuery": {
    "kind": "object",
    "properties": {
      "catalog_version": {
        "kind": "string"
      },
      "code": {
        "kind": "string"
      },
      "country": {
        "kind": "string"
      },
      "date": {
        "kind": "string"
      },
      "scheme": {
        "kind": "string"
      },
      "snapshot_id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATInformationSource": {
    "kind": "object",
    "properties": {
      "canonical_sha256": {
        "kind": "string"
      },
      "parser_version": {
        "kind": "string"
      },
      "raw_sha256": {
        "kind": "string"
      },
      "reference": {
        "kind": "string"
      },
      "requested_from": {
        "kind": "string"
      },
      "requested_to": {
        "kind": "string"
      },
      "retrieved_at": {
        "kind": "string"
      },
      "snapshot_id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATOperationalReview": {
    "kind": "object",
    "properties": {
      "calculation_status": {
        "kind": "string"
      },
      "classification": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATCatalogClassification"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "int32",
        "minimum": "0",
        "maximum": "6"
      },
      "declared_facts": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATDeclaredFacts"
      },
      "estimate": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATReviewAmounts"
      },
      "imported": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATReviewAmounts"
      },
      "imported_vat_differs": {
        "kind": "boolean"
      },
      "provisional": {
        "kind": "boolean"
      },
      "source_amount_status": {
        "kind": "string"
      },
      "vat_delta_minor": {
        "kind": "string"
      },
      "vat_engine_treatment": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATEngineTreatment"
      }
    }
  },
  "#/components/schemas/CustomerVATResult": {
    "kind": "object",
    "properties": {
      "calculation": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATCalculation"
      },
      "catalog_classification": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATCatalogClassification"
      },
      "classification_candidates": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerVATClassificationCandidate"
        }
      },
      "display": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATDisplay"
      },
      "event": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATEvent"
      },
      "filing_ready": {
        "kind": "boolean"
      },
      "information": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATInformation"
      },
      "informational_only": {
        "kind": "boolean"
      },
      "input_digest": {
        "kind": "string"
      },
      "issue": {
        "kind": "string"
      },
      "operational_review": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATOperationalReview"
      },
      "original_calculation_digest": {
        "kind": "string"
      },
      "original_review_event_id": {
        "kind": "string"
      },
      "provisional": {
        "kind": "boolean"
      },
      "provisional_product_revision": {
        "kind": "integer"
      },
      "rule_id": {
        "kind": "string"
      },
      "rule_revision": {
        "kind": "integer"
      },
      "scope": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATScope"
      },
      "shopify_classification": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATHistoricalShopifyClassification"
      },
      "source_alternatives": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATInformation"
      },
      "source_rule_revision": {
        "kind": "integer"
      },
      "state": {
        "kind": "string"
      },
      "store_default": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/CustomerVATRetireRequest": {
    "kind": "object",
    "properties": {
      "expected_revision": {
        "kind": "integer",
        "minimum": "1"
      },
      "rule_id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATRetireResponse": {
    "kind": "object",
    "properties": {
      "retired": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/CustomerVATReviewAmounts": {
    "kind": "object",
    "properties": {
      "gross_amount_minor": {
        "kind": "string"
      },
      "net_amount_minor": {
        "kind": "string"
      },
      "rate_bps": {
        "kind": "int64"
      },
      "vat_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATRule": {
    "kind": "object",
    "properties": {
      "action": {
        "kind": "string"
      },
      "alternatives_meaning": {
        "kind": "string"
      },
      "declarations": {
        "kind": "object",
        "properties": {},
        "additional": {
          "kind": "string"
        }
      },
      "effective_from": {
        "kind": "string"
      },
      "effective_to": {
        "kind": "string"
      },
      "id": {
        "kind": "string"
      },
      "information": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATInformation"
      },
      "option_id": {
        "kind": "string"
      },
      "option_meaning": {
        "kind": "string"
      },
      "revision": {
        "kind": "integer",
        "minimum": "1"
      },
      "scope": {
        "kind": "ref",
        "name": "#/components/schemas/CustomerVATScope"
      }
    }
  },
  "#/components/schemas/CustomerVATRulesResponse": {
    "kind": "object",
    "properties": {
      "rules": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/CustomerVATRule"
        }
      }
    }
  },
  "#/components/schemas/CustomerVATScope": {
    "kind": "object",
    "properties": {
      "assembly": {
        "kind": "boolean"
      },
      "catalog_version": {
        "kind": "string"
      },
      "code": {
        "kind": "string"
      },
      "country": {
        "kind": "string"
      },
      "customer_type": {
        "kind": "string"
      },
      "dispatch_country": {
        "kind": "string"
      },
      "excise": {
        "kind": "boolean"
      },
      "fixed_country": {
        "kind": "string"
      },
      "import_origin": {
        "kind": "string"
      },
      "integration_id": {
        "kind": "int64"
      },
      "kind": {
        "kind": "string"
      },
      "marketplace": {
        "kind": "boolean"
      },
      "new_means_of_transport": {
        "kind": "boolean"
      },
      "product": {
        "kind": "string"
      },
      "scheme": {
        "kind": "string"
      },
      "source_profile_id": {
        "kind": "int64"
      },
      "supplier_country": {
        "kind": "string"
      },
      "supply_kind": {
        "kind": "string"
      },
      "transaction_id": {
        "kind": "string"
      },
      "variant": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/CustomerVATSelectionRequest": {
    "kind": "object",
    "properties": {
      "circumstances": {
        "kind": "object",
        "properties": {},
        "additional": {
          "kind": "string"
        }
      },
      "confirmed_conditions": {
        "kind": "boolean"
      },
      "effective_to": {
        "kind": "string"
      },
      "event_id": {
        "kind": "string"
      },
      "expected_revision": {
        "kind": "integer",
        "minimum": "0"
      },
      "option_id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/ErrorResponse": {
    "kind": "object",
    "properties": {
      "detail": {
        "kind": "string"
      },
      "error": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/InformationalVATCalculation": {
    "kind": "object",
    "properties": {
      "assumptions": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "calculator_version": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "integer"
      },
      "declared_attributes": {
        "kind": "object",
        "properties": {},
        "additional": {
          "kind": "string"
        }
      },
      "gross_amount_minor": {
        "kind": "string"
      },
      "net_amount_minor": {
        "kind": "string"
      },
      "option_id": {
        "kind": "string"
      },
      "persistence": {
        "kind": "string"
      },
      "rate_bps": {
        "kind": "integer"
      },
      "vat_amount_minor": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/InformationalVATCalculationRequest": {
    "kind": "object",
    "properties": {
      "amount_minor": {
        "kind": "int64",
        "minimum": "0"
      },
      "currency": {
        "kind": "string"
      },
      "declared_attributes": {
        "kind": "object",
        "properties": {},
        "additional": {
          "kind": "string"
        }
      },
      "option_id": {
        "kind": "string"
      },
      "price_includes_vat": {
        "kind": "boolean"
      },
      "query": {
        "kind": "ref",
        "name": "#/components/schemas/InformationalVATQuery"
      }
    }
  },
  "#/components/schemas/InformationalVATQuery": {
    "kind": "object",
    "properties": {
      "catalog_version": {
        "kind": "string"
      },
      "code": {
        "kind": "string"
      },
      "country": {
        "kind": "string"
      },
      "date": {
        "kind": "string"
      },
      "scheme": {
        "kind": "string"
      },
      "snapshot_id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/InformationalVATResult": {
    "kind": "object",
    "properties": {
      "classification": {
        "kind": "object",
        "properties": {
          "description": {
            "kind": "string"
          },
          "display_code": {
            "kind": "string"
          },
          "node_digest": {
            "kind": "string"
          },
          "root_digest": {
            "kind": "string"
          },
          "source_digest": {
            "kind": "string"
          },
          "source_reference": {
            "kind": "string"
          },
          "valid_from": {
            "kind": "string"
          },
          "valid_to": {
            "kind": "string"
          },
          "version": {
            "kind": "string"
          }
        }
      },
      "disclaimer": {
        "kind": "string"
      },
      "filing_ready": {
        "kind": "boolean"
      },
      "informational_only": {
        "kind": "boolean"
      },
      "legal_applicability": {
        "kind": "string"
      },
      "options": {
        "kind": "array",
        "items": {
          "kind": "object",
          "properties": {
            "category": {
              "kind": "string"
            },
            "conditions": {
              "kind": "string"
            },
            "conditions_state": {
              "kind": "string"
            },
            "match_kind": {
              "kind": "string"
            },
            "matched_code": {
              "kind": "string"
            },
            "option_id": {
              "kind": "string"
            },
            "rate_bps": {
              "kind": "int64",
              "nullable": true,
              "minimum": "0",
              "maximum": "100000"
            },
            "source_ordinal": {
              "kind": "integer"
            },
            "source_reported_date": {
              "kind": "string"
            },
            "source_row_digest": {
              "kind": "string"
            },
            "value_type": {
              "kind": "string"
            }
          }
        }
      },
      "query": {
        "kind": "ref",
        "name": "#/components/schemas/InformationalVATQuery"
      },
      "schema_version": {
        "kind": "string"
      },
      "source": {
        "kind": "object",
        "properties": {
          "canonical_sha256": {
            "kind": "string"
          },
          "parser_version": {
            "kind": "string"
          },
          "raw_sha256": {
            "kind": "string"
          },
          "reference": {
            "kind": "string"
          },
          "requested_from": {
            "kind": "string"
          },
          "requested_to": {
            "kind": "string"
          },
          "retrieved_at": {
            "kind": "string"
          },
          "snapshot_id": {
            "kind": "string"
          }
        }
      },
      "source_assumptions": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "status": {
        "kind": "string"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      }
    }
  },
  "#/components/schemas/OSSAccountantReportFilingContext": {
    "kind": "object",
    "properties": {
      "filing_due_date": {
        "kind": "string"
      },
      "nil_return_eligible": {
        "kind": "boolean"
      },
      "status": {
        "kind": "string"
      },
      "status_detail": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/OSSAccountantReportResponse": {
    "kind": "object",
    "properties": {
      "country_breakdown": {
        "kind": "ref",
        "name": "#/components/schemas/OSSCountryVATBreakdownExportBreakdown"
      },
      "filing_context": {
        "kind": "ref",
        "name": "#/components/schemas/OSSAccountantReportFilingContext"
      },
      "manifest": {
        "kind": "ref",
        "name": "#/components/schemas/OSSReportExportManifest"
      },
      "summary": {
        "kind": "ref",
        "name": "#/components/schemas/OSSQuarterlySummaryExportSummary"
      }
    }
  },
  "#/components/schemas/OSSCountryVATBreakdownCountry": {
    "kind": "object",
    "properties": {
      "correction_vat_amount_minor": {
        "kind": "int64"
      },
      "corrections": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryCorrection"
        }
      },
      "current_vat_amount_minor": {
        "kind": "int64"
      },
      "included_in_payable_total": {
        "kind": "boolean"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "rows": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryRow"
        }
      },
      "source_event_count": {
        "kind": "integer"
      },
      "taxable_amount_minor": {
        "kind": "int64"
      },
      "vat_amount_minor": {
        "kind": "int64"
      }
    }
  },
  "#/components/schemas/OSSCountryVATBreakdownExportBreakdown": {
    "kind": "object",
    "properties": {
      "countries": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSCountryVATBreakdownExportCountry"
        }
      },
      "excluded_source_event_count": {
        "kind": "integer"
      },
      "included_source_event_count": {
        "kind": "integer"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "total_source_event_count": {
        "kind": "integer"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/OSSReportExportTotals"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSCountryVATBreakdownExportCountry": {
    "kind": "object",
    "properties": {
      "correction_vat_amount": {
        "kind": "string"
      },
      "corrections": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryExportCorrection"
        }
      },
      "current_vat_amount": {
        "kind": "string"
      },
      "included_in_payable_total": {
        "kind": "boolean"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "rows": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryExportRow"
        }
      },
      "source_event_count": {
        "kind": "integer"
      },
      "taxable_amount": {
        "kind": "string"
      },
      "vat_amount": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/OSSCountryVATBreakdownExportResponse": {
    "kind": "object",
    "properties": {
      "breakdown": {
        "kind": "ref",
        "name": "#/components/schemas/OSSCountryVATBreakdownExportBreakdown"
      },
      "manifest": {
        "kind": "ref",
        "name": "#/components/schemas/OSSReportExportManifest"
      }
    }
  },
  "#/components/schemas/OSSCountryVATBreakdownResponse": {
    "kind": "object",
    "properties": {
      "countries": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSCountryVATBreakdownCountry"
        }
      },
      "excluded_source_event_count": {
        "kind": "integer"
      },
      "included_source_event_count": {
        "kind": "integer"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "total_source_event_count": {
        "kind": "integer"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/OSSQuarterlySummaryTotals"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSFilingPrepIOSS": {
    "kind": "object",
    "properties": {
      "member_state_identification": {
        "kind": "string"
      },
      "months": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSFilingPrepIOSSMonth"
        }
      },
      "period_kind": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "source_event_counts": {
        "kind": "ref",
        "name": "#/components/schemas/OSSMultiJurisdictionSourceEventCounts"
      },
      "status": {
        "kind": "string"
      },
      "status_detail": {
        "kind": "string"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/OSSQuarterlySummaryTotals"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSFilingPrepIOSSMonth": {
    "kind": "object",
    "properties": {
      "filing_due_date": {
        "kind": "string"
      },
      "jurisdiction_count": {
        "kind": "integer"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "source_event_counts": {
        "kind": "ref",
        "name": "#/components/schemas/OSSMultiJurisdictionSourceEventCounts"
      },
      "status": {
        "kind": "string"
      },
      "status_detail": {
        "kind": "string"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/OSSQuarterlySummaryTotals"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSFilingPrepRegistrationsSummary": {
    "kind": "object",
    "properties": {
      "active_count": {
        "kind": "integer"
      },
      "details_incomplete_count": {
        "kind": "integer",
        "minimum": "0"
      },
      "ioss_covering_period": {
        "kind": "boolean"
      },
      "pending_count": {
        "kind": "integer"
      },
      "union_oss_ambiguous": {
        "kind": "boolean"
      },
      "union_oss_covering_period": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/OSSFilingPrepResponse": {
    "kind": "object",
    "properties": {
      "filing_due_date": {
        "kind": "string"
      },
      "generated_at": {
        "kind": "string"
      },
      "ioss": {
        "kind": "ref",
        "name": "#/components/schemas/OSSFilingPrepIOSS"
      },
      "official_basis": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "registrations": {
        "kind": "ref",
        "name": "#/components/schemas/OSSFilingPrepRegistrationsSummary"
      },
      "report_kind": {
        "kind": "string"
      },
      "union_oss": {
        "kind": "ref",
        "name": "#/components/schemas/OSSFilingPrepUnion"
      }
    }
  },
  "#/components/schemas/OSSFilingPrepUnion": {
    "kind": "object",
    "properties": {
      "filing_due_date": {
        "kind": "string"
      },
      "jurisdiction_count": {
        "kind": "integer"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "nil_return_eligible": {
        "kind": "boolean"
      },
      "period_kind": {
        "kind": "string"
      },
      "preview_available": {
        "kind": "boolean"
      },
      "return_currency": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "source_event_counts": {
        "kind": "ref",
        "name": "#/components/schemas/OSSMultiJurisdictionSourceEventCounts"
      },
      "status": {
        "kind": "string"
      },
      "status_detail": {
        "kind": "string"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/OSSQuarterlySummaryTotals"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSMultiJurisdictionExposure": {
    "kind": "object",
    "properties": {
      "member_state_consumption": {
        "kind": "string"
      },
      "report_line_count": {
        "kind": "integer"
      },
      "return_sections": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "scheme_types": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "source_event_count": {
        "kind": "integer"
      },
      "taxable_amount_minor": {
        "kind": "int64"
      },
      "vat_amount_minor": {
        "kind": "int64"
      }
    }
  },
  "#/components/schemas/OSSMultiJurisdictionIOSS": {
    "kind": "object",
    "properties": {
      "member_state_identification": {
        "kind": "string"
      },
      "months": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSMultiJurisdictionIOSSMonth"
        }
      },
      "period_kind": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "source_event_counts": {
        "kind": "ref",
        "name": "#/components/schemas/OSSMultiJurisdictionSourceEventCounts"
      },
      "status": {
        "kind": "string"
      },
      "status_detail": {
        "kind": "string"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/OSSQuarterlySummaryTotals"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSMultiJurisdictionIOSSMonth": {
    "kind": "object",
    "properties": {
      "filing_due_date": {
        "kind": "string"
      },
      "jurisdiction_count": {
        "kind": "integer"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "source_event_counts": {
        "kind": "ref",
        "name": "#/components/schemas/OSSMultiJurisdictionSourceEventCounts"
      },
      "status": {
        "kind": "string"
      },
      "status_detail": {
        "kind": "string"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/OSSQuarterlySummaryTotals"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSMultiJurisdictionReportResponse": {
    "kind": "object",
    "properties": {
      "generated_at": {
        "kind": "string"
      },
      "ioss": {
        "kind": "ref",
        "name": "#/components/schemas/OSSMultiJurisdictionIOSS"
      },
      "jurisdictions": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSMultiJurisdictionExposure"
        }
      },
      "official_basis": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "report_kind": {
        "kind": "string"
      },
      "union_oss": {
        "kind": "ref",
        "name": "#/components/schemas/OSSMultiJurisdictionUnionOSS"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSMultiJurisdictionSourceEventCounts": {
    "kind": "object",
    "properties": {
      "excluded": {
        "kind": "integer"
      },
      "included": {
        "kind": "integer"
      },
      "total": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/OSSMultiJurisdictionUnionOSS": {
    "kind": "object",
    "properties": {
      "filing_due_date": {
        "kind": "string"
      },
      "jurisdiction_count": {
        "kind": "integer"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "nil_return_eligible": {
        "kind": "boolean"
      },
      "period_kind": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "source_event_counts": {
        "kind": "ref",
        "name": "#/components/schemas/OSSMultiJurisdictionSourceEventCounts"
      },
      "status": {
        "kind": "string"
      },
      "status_detail": {
        "kind": "string"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/OSSQuarterlySummaryTotals"
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryBalance": {
    "kind": "object",
    "properties": {
      "correction_vat_amount_minor": {
        "kind": "int64"
      },
      "current_vat_amount_minor": {
        "kind": "int64"
      },
      "included_in_payable_total": {
        "kind": "boolean"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "vat_amount_minor": {
        "kind": "int64"
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryCorrection": {
    "kind": "object",
    "properties": {
      "member_state_consumption": {
        "kind": "string"
      },
      "original_period_key": {
        "kind": "string"
      },
      "source_event_count": {
        "kind": "integer"
      },
      "vat_correction_amount_minor": {
        "kind": "int64"
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryExportBalance": {
    "kind": "object",
    "properties": {
      "correction_vat_amount": {
        "kind": "string"
      },
      "current_vat_amount": {
        "kind": "string"
      },
      "included_in_payable_total": {
        "kind": "boolean"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "vat_amount": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryExportCorrection": {
    "kind": "object",
    "properties": {
      "member_state_consumption": {
        "kind": "string"
      },
      "original_period_key": {
        "kind": "string"
      },
      "source_event_count": {
        "kind": "integer"
      },
      "vat_correction_amount": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryExportResponse": {
    "kind": "object",
    "properties": {
      "manifest": {
        "kind": "ref",
        "name": "#/components/schemas/OSSReportExportManifest"
      },
      "summary": {
        "kind": "ref",
        "name": "#/components/schemas/OSSQuarterlySummaryExportSummary"
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryExportRow": {
    "kind": "object",
    "properties": {
      "dispatch_country": {
        "kind": "string"
      },
      "fixed_establishment_country": {
        "kind": "string"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "return_rate_category": {
        "kind": "string"
      },
      "return_section": {
        "kind": "string"
      },
      "source_event_count": {
        "kind": "integer"
      },
      "supply_kind": {
        "kind": "string"
      },
      "taxable_amount": {
        "kind": "string"
      },
      "vat_amount": {
        "kind": "string"
      },
      "vat_rate_pct": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryExportSummary": {
    "kind": "object",
    "properties": {
      "balances": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryExportBalance"
        }
      },
      "corrections": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryExportCorrection"
        }
      },
      "excluded_source_event_count": {
        "kind": "integer"
      },
      "included_source_event_count": {
        "kind": "integer"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "rows": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryExportRow"
        }
      },
      "scheme_type": {
        "kind": "string"
      },
      "total_source_event_count": {
        "kind": "integer"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/OSSReportExportTotals"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryResponse": {
    "kind": "object",
    "properties": {
      "balances": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryBalance"
        }
      },
      "corrections": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryCorrection"
        }
      },
      "excluded_source_event_count": {
        "kind": "integer"
      },
      "included_source_event_count": {
        "kind": "integer"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "rows": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryRow"
        }
      },
      "scheme_type": {
        "kind": "string"
      },
      "total_source_event_count": {
        "kind": "integer"
      },
      "totals": {
        "kind": "ref",
        "name": "#/components/schemas/OSSQuarterlySummaryTotals"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryRow": {
    "kind": "object",
    "properties": {
      "dispatch_country": {
        "kind": "string"
      },
      "fixed_establishment_country": {
        "kind": "string"
      },
      "member_state_consumption": {
        "kind": "string"
      },
      "return_rate_category": {
        "kind": "string"
      },
      "return_section": {
        "kind": "string"
      },
      "source_event_count": {
        "kind": "integer"
      },
      "supply_kind": {
        "kind": "string"
      },
      "taxable_amount_minor": {
        "kind": "int64"
      },
      "vat_amount_minor": {
        "kind": "int64"
      },
      "vat_rate_bps": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryTotals": {
    "kind": "object",
    "properties": {
      "correction_vat_amount_minor": {
        "kind": "int64"
      },
      "current_vat_amount_minor": {
        "kind": "int64"
      },
      "taxable_amount_minor": {
        "kind": "int64"
      },
      "vat_amount_minor": {
        "kind": "int64"
      }
    }
  },
  "#/components/schemas/OSSQuarterlySummaryWarning": {
    "kind": "object",
    "properties": {
      "code": {
        "kind": "string"
      },
      "count": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/OSSReportExportManifest": {
    "kind": "object",
    "properties": {
      "conversion_rule": {
        "kind": "string"
      },
      "export_kind": {
        "kind": "string"
      },
      "export_version": {
        "kind": "integer"
      },
      "generated_at": {
        "kind": "string"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "scope_note": {
        "kind": "string"
      },
      "source_event_counts": {
        "kind": "ref",
        "name": "#/components/schemas/OSSReportExportManifestSourceEventCounts"
      },
      "warnings": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/OSSQuarterlySummaryWarning"
        }
      }
    }
  },
  "#/components/schemas/OSSReportExportManifestSourceEventCounts": {
    "kind": "object",
    "properties": {
      "excluded": {
        "kind": "integer"
      },
      "included": {
        "kind": "integer"
      },
      "total": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/OSSReportExportTotals": {
    "kind": "object",
    "properties": {
      "correction_vat_amount": {
        "kind": "string"
      },
      "current_vat_amount": {
        "kind": "string"
      },
      "taxable_amount": {
        "kind": "string"
      },
      "vat_amount": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/RateProvenance": {
    "kind": "object",
    "properties": {
      "approved_at": {
        "kind": "string"
      },
      "effective_at": {
        "kind": "string"
      },
      "evidence_status": {
        "kind": "string"
      },
      "mapping_sha256": {
        "kind": "string"
      },
      "mapping_version": {
        "kind": "string"
      },
      "rate_data_version": {
        "kind": "string"
      },
      "rate_matrix_sha256": {
        "kind": "string"
      },
      "rate_row_digest": {
        "kind": "string"
      },
      "schema_version": {
        "kind": "string"
      },
      "source": {
        "kind": "string"
      },
      "source_evidence": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/RateSnapshotReference"
        }
      },
      "source_manifest_sha256": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/RateSnapshotReference": {
    "kind": "object",
    "properties": {
      "canonical_sha256": {
        "kind": "string"
      },
      "raw_sha256": {
        "kind": "string"
      },
      "retrieved_at": {
        "kind": "string"
      },
      "snapshot_id": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/SmeCodeDetail": {
    "kind": "object",
    "properties": {
      "description": {
        "kind": "string"
      },
      "value": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/SmeEligibilityPolicy": {
    "kind": "object",
    "properties": {
      "exclusion_article288_quarantine_period": {
        "kind": "string"
      },
      "one_national_annual_threshold": {
        "kind": "boolean"
      },
      "voluntary_cessation_article290": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/SmeEligibilityRequest": {
    "kind": "object",
    "properties": {
      "annual_turnover_nac": {
        "kind": "int64"
      },
      "country": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "reference_date": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/SmeEligibilityResponse": {
    "kind": "object",
    "properties": {
      "annual_turnover_nac": {
        "kind": "int64"
      },
      "country": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "data_situation_on": {
        "kind": "string"
      },
      "disclaimer": {
        "kind": "string"
      },
      "ecb_rate_date": {
        "kind": "string"
      },
      "ecb_rate_eur": {
        "kind": "double",
        "nullable": true
      },
      "eligibility_status": {
        "kind": "string"
      },
      "eligible_for_exemption": {
        "kind": "boolean"
      },
      "exceeded_by_nac": {
        "kind": "int64",
        "nullable": true
      },
      "exemption_threshold_eur": {
        "kind": "double",
        "nullable": true
      },
      "exemption_threshold_nac": {
        "kind": "double",
        "nullable": true
      },
      "policy": {
        "kind": "ref",
        "name": "#/components/schemas/SmeEligibilityPolicy"
      },
      "reference_date": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "sectorals": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/SmeEligibilitySectoral"
        }
      }
    }
  },
  "#/components/schemas/SmeEligibilitySectoral": {
    "kind": "object",
    "properties": {
      "comment": {
        "kind": "string"
      },
      "exemption_threshold_eur": {
        "kind": "double",
        "nullable": true
      },
      "exemption_threshold_nac": {
        "kind": "double",
        "nullable": true
      },
      "sector": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/SmeExemptionItem": {
    "kind": "object",
    "properties": {
      "article290QuarantinePeriod": {
        "kind": "string"
      },
      "exclusionArticle288QuarantinePeriod": {
        "kind": "string"
      },
      "nationalAnnualThreshold": {
        "kind": "boolean"
      },
      "oneNationalAnnualThreshold": {
        "kind": "boolean"
      },
      "sectorals": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/SmeSectoralItem"
        }
      },
      "thresholdEur": {
        "kind": "double",
        "nullable": true
      },
      "thresholdNac": {
        "kind": "double",
        "nullable": true
      },
      "transitionalPeriodExceeded": {
        "kind": "string"
      },
      "voluntaryCessationArticle290": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/SmeSectoralItem": {
    "kind": "object",
    "properties": {
      "cnCodes": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/SmeCodeDetail"
        }
      },
      "comment": {
        "kind": "string"
      },
      "cpaCodes": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/SmeCodeDetail"
        }
      },
      "exemptionThresholdEur": {
        "kind": "double",
        "nullable": true
      },
      "exemptionThresholdNac": {
        "kind": "double",
        "nullable": true
      },
      "sector": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/SmeThresholdItem": {
    "kind": "object",
    "properties": {
      "cashAccountingEur": {
        "kind": "double",
        "nullable": true
      },
      "cashAccountingNac": {
        "kind": "double",
        "nullable": true
      },
      "country": {
        "kind": "string"
      },
      "exemption": {
        "kind": "ref",
        "name": "#/components/schemas/SmeExemptionItem"
      },
      "flatRateSchemeEur": {
        "kind": "double",
        "nullable": true
      },
      "flatRateSchemeNac": {
        "kind": "double",
        "nullable": true
      },
      "nationalCurrency": {
        "kind": "string"
      },
      "nonEstablishedBusinessEur": {
        "kind": "double",
        "nullable": true
      },
      "nonEstablishedBusinessNac": {
        "kind": "double",
        "nullable": true
      },
      "reducedSupplyOfServicesEur": {
        "kind": "double",
        "nullable": true
      },
      "reducedSupplyOfServicesNac": {
        "kind": "double",
        "nullable": true
      },
      "situationOn": {
        "kind": "string"
      },
      "taxName": {
        "kind": "string"
      },
      "thresholdType": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/SmeThresholdsListResponse": {
    "kind": "object",
    "properties": {
      "thresholds": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/SmeThresholdItem"
        }
      }
    }
  },
  "#/components/schemas/SourceProfile": {
    "kind": "object",
    "properties": {
      "active": {
        "kind": "boolean"
      },
      "aliases": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "channel_type": {
        "kind": "string"
      },
      "created_at": {
        "kind": "string"
      },
      "default_country": {
        "kind": "string"
      },
      "default_currency": {
        "kind": "string"
      },
      "dispatch_country": {
        "kind": "string"
      },
      "dispatched_without_supplier_installation_from": {
        "kind": "string"
      },
      "display_name": {
        "kind": "string"
      },
      "id": {
        "kind": "int64"
      },
      "marketplace_deemed_supplier": {
        "kind": "boolean"
      },
      "platform": {
        "kind": "string"
      },
      "source_key": {
        "kind": "string"
      },
      "supplier_establishment_country": {
        "kind": "string"
      },
      "updated_at": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/SourceProfilesResponse": {
    "kind": "object",
    "properties": {
      "activeCount": {
        "kind": "integer"
      },
      "items": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/SourceProfile"
        }
      },
      "maxProfiles": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/TaxClassCountryRate": {
    "kind": "object",
    "properties": {
      "country": {
        "kind": "string"
      },
      "rate_bps": {
        "kind": "int64"
      },
      "valid_from": {
        "kind": "string"
      },
      "valid_to": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/TaxClassDetailResponse": {
    "kind": "object",
    "properties": {
      "description": {
        "kind": "string"
      },
      "group_name": {
        "kind": "string"
      },
      "group_slug": {
        "kind": "string"
      },
      "id": {
        "kind": "string"
      },
      "name": {
        "kind": "string"
      },
      "rates": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/TaxClassCountryRate"
        }
      },
      "source": {
        "kind": "string"
      },
      "tags": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      }
    }
  },
  "#/components/schemas/TaxClassListItem": {
    "kind": "object",
    "properties": {
      "description": {
        "kind": "string"
      },
      "group_name": {
        "kind": "string"
      },
      "group_slug": {
        "kind": "string"
      },
      "id": {
        "kind": "string"
      },
      "name": {
        "kind": "string"
      },
      "preview_rate_bps": {
        "kind": "int64",
        "nullable": true
      },
      "source": {
        "kind": "string"
      },
      "tags": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      }
    }
  },
  "#/components/schemas/TaxClassListResponse": {
    "kind": "object",
    "properties": {
      "items": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/TaxClassListItem"
        }
      }
    }
  },
  "#/components/schemas/TaxRegistration": {
    "kind": "object",
    "properties": {
      "created_at": {
        "kind": "string"
      },
      "details_complete": {
        "kind": "boolean"
      },
      "effective_from": {
        "kind": "string"
      },
      "effective_to": {
        "kind": "string"
      },
      "id": {
        "kind": "int64"
      },
      "identifier_masked": {
        "kind": "string"
      },
      "identifier_type": {
        "kind": "string"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "status": {
        "kind": "string"
      },
      "updated_at": {
        "kind": "string"
      },
      "vat_registration_number_masked": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/TaxRegistrationsResponse": {
    "kind": "object",
    "properties": {
      "items": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/TaxRegistration"
        }
      }
    }
  },
  "#/components/schemas/ThresholdCheckRequest": {
    "kind": "object",
    "properties": {
      "amount_minor": {
        "kind": "int64"
      },
      "from": {
        "kind": "string"
      },
      "threshold_type": {
        "kind": "string"
      },
      "to": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/ThresholdCheckResponse": {
    "kind": "object",
    "properties": {
      "article_59c_applicability_status": {
        "kind": "string"
      },
      "converted_currencies": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "currency": {
        "kind": "string"
      },
      "currency_scale": {
        "kind": "integer",
        "minimum": "0",
        "maximum": "4"
      },
      "current_comparison": {
        "kind": "string"
      },
      "current_minor": {
        "kind": "int64"
      },
      "current_year_blocking_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "current_year_candidate_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "current_year_coverage": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/Article59cCoverageGroup"
        }
      },
      "current_year_crossing": {
        "kind": "object",
        "properties": {
          "cumulative_after": {
            "kind": "ref",
            "name": "#/components/schemas/Article59cCanonicalMoney"
          },
          "cumulative_before": {
            "kind": "ref",
            "name": "#/components/schemas/Article59cCanonicalMoney"
          },
          "source_event_time": {
            "kind": "string"
          }
        }
      },
      "current_year_excluded_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "cutoff_at": {
        "kind": "string"
      },
      "disclaimer": {
        "kind": "string"
      },
      "establishment_country": {
        "kind": "string"
      },
      "eur_only": {
        "kind": "boolean"
      },
      "evidence_status": {
        "kind": "string"
      },
      "exceeded": {
        "kind": "boolean"
      },
      "filing_readiness": {
        "kind": "string"
      },
      "historical_crossing_proven": {
        "kind": "boolean"
      },
      "issues": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "legal_effective_date": {
        "kind": "string"
      },
      "percentage_used": {
        "kind": "integer"
      },
      "policy_digest": {
        "kind": "string"
      },
      "policy_version": {
        "kind": "string"
      },
      "preceding_year_blocking_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "preceding_year_candidate_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "preceding_year_coverage": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/Article59cCoverageGroup"
        }
      },
      "preceding_year_crossing": {
        "kind": "object",
        "properties": {
          "cumulative_after": {
            "kind": "ref",
            "name": "#/components/schemas/Article59cCanonicalMoney"
          },
          "cumulative_before": {
            "kind": "ref",
            "name": "#/components/schemas/Article59cCanonicalMoney"
          },
          "source_event_time": {
            "kind": "string"
          }
        }
      },
      "preceding_year_excluded_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "previous_comparison": {
        "kind": "string"
      },
      "previous_year_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "previous_year_minor": {
        "kind": "int64"
      },
      "primary_treatment_driver": {
        "kind": "string"
      },
      "release_digest": {
        "kind": "string"
      },
      "release_version": {
        "kind": "string"
      },
      "remaining_minor": {
        "kind": "int64"
      },
      "source_event_count": {
        "kind": "int64",
        "minimum": "0"
      },
      "threshold_evidence_status": {
        "kind": "string"
      },
      "threshold_minor": {
        "kind": "int64"
      },
      "threshold_type": {
        "kind": "string"
      },
      "treatment_triggers": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/Article59cTreatmentTrigger"
        }
      },
      "unconverted_currencies": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "warning": {
        "kind": "boolean"
      }
    }
  },
  "#/components/schemas/ThresholdItem": {
    "kind": "object",
    "properties": {
      "country": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "description": {
        "kind": "string"
      },
      "effective_from": {
        "kind": "string"
      },
      "effective_to": {
        "kind": "string"
      },
      "id": {
        "kind": "string"
      },
      "threshold_amount_minor": {
        "kind": "int64"
      },
      "threshold_type": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/ThresholdListResponse": {
    "kind": "object",
    "properties": {
      "thresholds": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/ThresholdItem"
        }
      }
    }
  },
  "#/components/schemas/TransactionDetailResponse": {
    "kind": "object",
    "properties": {
      "calculation_id": {
        "kind": "string"
      },
      "calculation_provenance": {
        "kind": "ref",
        "name": "#/components/schemas/CalculationProvenance"
      },
      "id": {
        "kind": "string"
      },
      "rate_provenance": {
        "kind": "ref",
        "name": "#/components/schemas/RateProvenance"
      },
      "transaction": {
        "kind": "ref",
        "name": "#/components/schemas/TransactionItem"
      }
    }
  },
  "#/components/schemas/TransactionItem": {
    "kind": "object",
    "properties": {
      "country": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "gross_amount_minor": {
        "kind": "int64"
      },
      "id": {
        "kind": "string"
      },
      "net_amount_minor": {
        "kind": "int64"
      },
      "rate_evidence_status": {
        "kind": "string"
      },
      "request_id": {
        "kind": "string"
      },
      "source_id": {
        "kind": "string"
      },
      "tax_class_id": {
        "kind": "string"
      },
      "transaction_date": {
        "kind": "string"
      },
      "vat_amount_minor": {
        "kind": "int64"
      },
      "vat_rate_bps": {
        "kind": "int64"
      }
    }
  },
  "#/components/schemas/TransactionListResponse": {
    "kind": "object",
    "properties": {
      "next_cursor": {
        "kind": "string"
      },
      "transactions": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/TransactionItem"
        }
      }
    }
  },
  "#/components/schemas/UnionOSSLockedReturnExportResponse": {
    "kind": "object",
    "properties": {
      "byte_size": {
        "kind": "integer"
      },
      "content_type": {
        "kind": "string"
      },
      "created_at": {
        "kind": "string"
      },
      "export_format": {
        "kind": "string"
      },
      "export_kind": {
        "kind": "string"
      },
      "export_version": {
        "kind": "integer"
      },
      "filename": {
        "kind": "string"
      },
      "id": {
        "kind": "int64"
      },
      "sha256_hex": {
        "kind": "string"
      },
      "status": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/UnionOSSLockedReturnPeriodListResponse": {
    "kind": "object",
    "properties": {
      "current_period": {
        "kind": "ref",
        "name": "#/components/schemas/UnionOSSLockedReturnPeriodResponse"
      },
      "items": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/UnionOSSLockedReturnPeriodResponse"
        }
      },
      "scheme_type": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/UnionOSSLockedReturnPeriodResponse": {
    "kind": "object",
    "properties": {
      "due_date": {
        "kind": "string"
      },
      "excluded_source_event_count": {
        "kind": "integer"
      },
      "export_count": {
        "kind": "integer"
      },
      "exports": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/UnionOSSLockedReturnExportResponse"
        }
      },
      "filed_at": {
        "kind": "string"
      },
      "filing_status": {
        "kind": "string"
      },
      "filing_status_detail": {
        "kind": "string"
      },
      "id": {
        "kind": "int64"
      },
      "included_source_event_count": {
        "kind": "integer"
      },
      "jurisdiction_count": {
        "kind": "integer"
      },
      "latest_export_at": {
        "kind": "string"
      },
      "locked_at": {
        "kind": "string"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "nil_return_eligible": {
        "kind": "boolean"
      },
      "period_end": {
        "kind": "string"
      },
      "period_key": {
        "kind": "string"
      },
      "period_kind": {
        "kind": "string"
      },
      "period_start": {
        "kind": "string"
      },
      "return_currency": {
        "kind": "string"
      },
      "scheme_type": {
        "kind": "string"
      },
      "status": {
        "kind": "string"
      },
      "taxable_amount_minor": {
        "kind": "int64"
      },
      "total_source_event_count": {
        "kind": "integer"
      },
      "vat_amount_minor": {
        "kind": "int64"
      },
      "warning_count": {
        "kind": "integer"
      }
    }
  },
  "#/components/schemas/UnknownSource": {
    "kind": "object",
    "properties": {
      "first_seen": {
        "kind": "string"
      },
      "last_seen": {
        "kind": "string"
      },
      "source_id": {
        "kind": "string"
      },
      "transaction_count": {
        "kind": "int64"
      }
    }
  },
  "#/components/schemas/UnknownSourcesResponse": {
    "kind": "object",
    "properties": {
      "items": {
        "kind": "array",
        "items": {
          "kind": "ref",
          "name": "#/components/schemas/UnknownSource"
        }
      }
    }
  },
  "#/components/schemas/UpdateSourceProfileRequest": {
    "kind": "object",
    "properties": {
      "active": {
        "kind": "boolean"
      },
      "aliases": {
        "kind": "array",
        "items": {
          "kind": "string"
        }
      },
      "channel_type": {
        "kind": "string"
      },
      "default_country": {
        "kind": "string"
      },
      "default_currency": {
        "kind": "string"
      },
      "dispatch_country": {
        "kind": "string"
      },
      "dispatched_without_supplier_installation_from": {
        "kind": "string"
      },
      "display_name": {
        "kind": "string"
      },
      "marketplace_deemed_supplier": {
        "kind": "boolean"
      },
      "platform": {
        "kind": "string"
      },
      "supplier_establishment_country": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/UpdateTaxRegistrationRequest": {
    "kind": "object",
    "properties": {
      "active": {
        "kind": "boolean"
      },
      "effective_from": {
        "kind": "string"
      },
      "effective_to": {
        "kind": "string"
      },
      "marketplace_deemed_supplier": {
        "kind": "boolean"
      },
      "member_state_identification": {
        "kind": "string"
      },
      "registration_identifier": {
        "kind": "string"
      },
      "status": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/VatCalculateRequest": {
    "kind": "object",
    "properties": {
      "country": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "gross_amount_minor": {
        "kind": "int64",
        "minimum": "0"
      },
      "price_includes_vat": {
        "kind": "boolean"
      },
      "tax_class_id": {
        "kind": "string"
      },
      "transaction_date": {
        "kind": "string"
      }
    }
  },
  "#/components/schemas/VatCalculateResponse": {
    "kind": "object",
    "properties": {
      "calculation_id": {
        "kind": "string"
      },
      "calculation_provenance": {
        "kind": "ref",
        "name": "#/components/schemas/CalculationProvenance"
      },
      "country": {
        "kind": "string"
      },
      "currency": {
        "kind": "string"
      },
      "gross_amount_minor": {
        "kind": "int64"
      },
      "net_amount_minor": {
        "kind": "int64"
      },
      "rate_provenance": {
        "kind": "ref",
        "name": "#/components/schemas/RateProvenance"
      },
      "transaction_date": {
        "kind": "string"
      },
      "vat_amount_minor": {
        "kind": "int64"
      },
      "vat_rate_bps": {
        "kind": "int64"
      }
    }
  },
  "#/components/schemas/VatRateResponse": {
    "kind": "object",
    "properties": {
      "country": {
        "kind": "string"
      },
      "rate_bps": {
        "kind": "int64"
      },
      "tax_class_id": {
        "kind": "string"
      },
      "valid_from": {
        "kind": "string"
      },
      "valid_to": {
        "kind": "string"
      }
    }
  }
};
