// Generated from the pinned public OpenAPI. Run npm run generate.
export interface paths {
    "/agent/auth": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Request approval for a sandbox agent key
         * @description Start an anonymous registration for the customer’s public Account ID. The request appears in the account holder’s API Keys inventory.
         */
        post: operations["startAgentRegistration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/agent/auth/claim": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Retrieve a sandbox agent key after approval
         * @description Retrieve the key using the short-lived claim token. Retried claims return the same active key while the token is valid.
         */
        post: operations["claimAgentAPIKey"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Health check (liveness probe)
         * @description Returns 200 when the API process can answer the liveness probe.
         */
        get: operations["health"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ready": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Readiness check
         * @description Returns 200 when the API is accepting traffic and its readiness checks pass.
         */
        get: operations["ready"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/context": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Verify the authenticated API key's account and data environment
         * @description Available to all four customer scopes. Discovery grants no VAT treatment or filing authority.
         */
        get: operations["getAuthContext"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/classification-codes/{scheme}/{code}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Look up an exact CN or CPA code in official source data
         * @description Uses the retained official catalog covering the requested date and edition. The date defaults to the current UTC date. This lookup reports catalog facts. Use the informational VAT resolver to evaluate source rates and conditions.
         */
        get: {
            parameters: {
                query?: {
                    catalog_version?: string;
                    /** @description Date used to select the catalog edition. Defaults to the current UTC date. */
                    legal_date?: string;
                };
                header?: never;
                path: {
                    code: string;
                    scheme: "cn" | "cpa";
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Exact catalog node and public official-source provenance */
                200: {
                    headers: {
                        /** @description Catalog selection results must not be cached. */
                        "Cache-Control"?: "no-store";
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ClassificationInformationalCode"];
                    };
                };
                /** @description Invalid scheme, code, catalog version, legal date, or query */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description No retained official catalog covers the requested scheme, date and edition, or the selected catalog lacks the code. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Multiple retained official catalogs cover the request. Specify the edition. */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Distributed classification limit exceeded */
                429: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Classification service or distributed limiter unavailable */
                503: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/compliance/threshold-status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Compliance Threshold Status
         * @description Returns governed Article 59c threshold evidence for the current and preceding calendar
         *     years in the approved establishment currency. Incomplete evidence produces an empty
         *     `checks` array and bounded issue codes; it never produces an understated legal-looking
         *     comparison. Threshold evidence remains separate from sole-establishment, taxation-option,
         *     registration, and filing-readiness conditions.
         *     IOSS is per-consignment and not included — use POST /v1/vat/threshold-check for IOSS validation.
         *
         *     Requires a V2 API key with `full` or `read-only` scope.
         */
        get: operations["complianceThresholdStatus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/article59c": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Inspect account-wide annual Article 59c turnover
         * @description Requires full or read-only API scope. The account comes from authentication.
         *     Returns observed current and preceding-year turnover, four quarterly subdivisions,
         *     historical threshold crossings, customer declarations and explicit coverage issues.
         *     Monitoring is independent of OSS registration. Progress is supplied when customer
         *     coverage and source evidence support it. The result is informational_only with
         *     filing_ready=false. It grants no filing authority and changes no economic records.
         */
        get: {
            parameters: {
                query: {
                    /** @description Canonical calendar-year integer from 2000 through the current UTC year plus one. A future year returns an unknown comparison. */
                    year: number;
                };
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Annual Article 59c monitoring with customer declarations and coverage. */
                200: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerAnnualArticle59c"];
                    };
                };
                /** @description Invalid or unsupported calendar year. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Source or operational reader temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/attention": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Count unresolved current customer VAT imports
         * @description Account-owned operational review count, capped at 100 with has_more. Completed informational calculations do not require a governed Mapping approval.
         */
        get: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Count of unresolved events in the current account. */
                200: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerVATAttentionResponse"];
                    };
                };
                400: components["responses"]["InvalidExpectedContext"];
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Operational reader unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/classification": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Declare an informational product classification
         * @description Account scope comes only from authenticated server context, never from the request body.
         *     Requires full API scope for writes.
         *     Retains customer declarations and provenance without granting filing authority or changing locked periods.
         */
        post: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CustomerVATClassificationRequest"];
                };
            };
            responses: {
                /** @description Operational VAT evaluation after saving the classification. */
                200: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerVATResult"];
                    };
                };
                /** @description Invalid fields, dates or confirmations. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Owned record not found. */
                404: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Changed evidence, revision conflict or locked economic period. */
                409: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description No usable catalog classification for the requested scope. */
                422: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Source or operational reader temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List customer operational VAT results
         * @description Account scope comes only from authenticated server context, never from the request body.
         *     Requires full or read-only API scope.
         *     Retains customer declarations and provenance without granting filing authority or changing locked periods.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Filter by destination country. */
                    country?: string;
                    /** @description Opaque next_cursor from the preceding events response. Retain the same account and filters. */
                    cursor?: string;
                    event_id?: string;
                    /** @description Maximum events per page. */
                    limit?: number;
                    /** @description Filter queued and review events before the 200-result limit. */
                    pending_only?: boolean;
                    /** @description Filter by a supported Union OSS quarter. */
                    period?: string;
                };
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Page of current customer VAT evaluations. */
                200: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerVATEventsResponse"];
                    };
                };
                /** @description Invalid fields, dates or confirmations. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Owned record not found. */
                404: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Changed evidence, revision conflict or locked economic period. */
                409: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description No usable catalog classification for the requested scope. */
                422: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Source or operational reader temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/ioss": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Inspect or export an informational IOSS month preview
         * @description Account scope comes only from authenticated server context, never from the request body.
         *     Requires full or read-only API scope.
         *     Retains customer declarations and provenance without granting filing authority or changing locked periods.
         *     No registration number is required. Includes eligible destination VAT and linked corrections; establishes no filing or customs treatment.
         */
        get: {
            parameters: {
                query: {
                    format?: "csv" | "json";
                    period: string;
                };
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Monthly IOSS preview as JSON or CSV, according to the format parameter. */
                200: {
                    headers: {
                        /** @description Attachment filename when the format parameter is supplied. */
                        "Content-Disposition"?: string;
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerIOSSReport"];
                        "text/csv": string;
                    };
                };
                /** @description Invalid fields, dates or confirmations. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Owned record not found. */
                404: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Changed evidence, revision conflict or locked economic period. */
                409: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description No usable catalog classification for the requested scope. */
                422: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Source or operational reader temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/oss": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Inspect or export operational Union OSS calculations
         * @description Account scope comes only from authenticated server context, never from the request body.
         *     Requires full or read-only API scope.
         *     Retains customer declarations and provenance without granting filing authority or changing locked periods.
         *     customer_declarations_revision is the account-wide save revision; customer_declarations contains values for the requested year.
         *     Missing or ambiguous registration produces a registration_independent_preview in EUR, subject to the same destination-place-of-supply checks.
         */
        get: {
            parameters: {
                query: {
                    format?: "csv" | "json";
                    period: string;
                };
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Operational Union OSS preview as JSON or CSV, according to the format parameter. */
                200: {
                    headers: {
                        /** @description Attachment filename when the format parameter is supplied. */
                        "Content-Disposition"?: string;
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerOSSReport"];
                        "text/csv": string;
                    };
                };
                /** @description Invalid fields, dates or confirmations. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Owned record not found. */
                404: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Changed evidence, revision conflict or locked economic period. */
                409: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description No usable catalog classification for the requested scope. */
                422: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Source or operational reader temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/oss-context": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Save customer OSS establishment and coverage declarations
         * @description Account scope comes only from authenticated server context, never from the request body.
         *     Requires full API scope for writes.
         *     Retains customer declarations and provenance without granting filing authority or changing locked periods.
         */
        post: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CustomerOSSContextRequest"];
                };
            };
            responses: {
                /** @description Customer declarations saved. */
                200: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerOSSContextSaveResponse"];
                    };
                };
                /** @description Invalid fields, dates or confirmations. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Owned record not found. */
                404: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Changed evidence, revision conflict or locked economic period. */
                409: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description No usable catalog classification for the requested scope. */
                422: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Source or operational reader temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/provisional-rate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Save an explicit provisional VAT rate for an owned unclassified sale
         * @description Reuse the customer rate in the same store, product, destination and supply context while classification is missing. Requires full scope with API key authentication.
         */
        post: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** Format: date */
                        effective_to?: string;
                        /** Format: uuid */
                        event_id: string;
                        expected_revision: number;
                        rate_bps: number;
                        reason: string;
                    };
                };
            };
            responses: {
                /** @description Operational VAT evaluation after saving the provisional rate. */
                200: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerVATResult"];
                    };
                };
                /** @description Invalid rate, reason or dates. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Owned event not found. */
                404: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Stale revision, ineligible context or locked period. */
                409: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Operational processing temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/reprocess": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reprocess an unlocked customer transaction
         * @description Account scope comes only from authenticated server context, never from the request body.
         *     Requires full API scope for writes.
         *     Retains customer declarations and provenance without granting filing authority or changing locked periods.
         */
        post: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CustomerVATEventRequest"];
                };
            };
            responses: {
                /** @description Operational VAT evaluation after reprocessing the event. */
                200: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerVATResult"];
                    };
                };
                /** @description Invalid fields, dates or confirmations. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Owned record not found. */
                404: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Changed evidence, revision conflict or locked economic period. */
                409: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description No usable catalog classification for the requested scope. */
                422: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Source or operational reader temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/retire": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Retire a customer-owned product rule
         * @description Account scope comes only from authenticated server context, never from the request body.
         *     Requires full API scope for writes.
         *     Retains customer declarations and provenance without granting filing authority or changing locked periods.
         */
        post: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CustomerVATRetireRequest"];
                };
            };
            responses: {
                /** @description Customer VAT rule retired. */
                200: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerVATRetireResponse"];
                    };
                };
                /** @description Invalid fields, dates or confirmations. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Owned record not found. */
                404: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Changed evidence, revision conflict or locked economic period. */
                409: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description No usable catalog classification for the requested scope. */
                422: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Source or operational reader temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/rules": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List current customer product VAT choices
         * @description Account scope comes only from authenticated server context, never from the request body.
         *     Requires full or read-only API scope.
         *     Retains customer declarations and provenance without granting filing authority or changing locked periods.
         */
        get: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Current saved product VAT rules and their revisions. */
                200: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerVATRulesResponse"];
                    };
                };
                /** @description Invalid fields, dates or confirmations. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Owned record not found. */
                404: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Changed evidence, revision conflict or locked economic period. */
                409: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description No usable catalog classification for the requested scope. */
                422: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Source or operational reader temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/customer-vat/select": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Save a customer-owned source-option choice
         * @description Account scope comes only from authenticated server context, never from the request body.
         *     Requires full API scope for writes.
         *     Retains customer declarations and provenance without granting filing authority or changing locked periods.
         */
        post: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                    "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CustomerVATSelectionRequest"];
                };
            };
            responses: {
                /** @description Operational VAT evaluation after saving the selected option. */
                200: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CustomerVATResult"];
                    };
                };
                /** @description Invalid fields, dates or confirmations. */
                400: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ErrorResponse"];
                    };
                };
                /** @description Authentication required. */
                401: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                403: components["responses"]["InsufficientScope"];
                /** @description Owned record not found. */
                404: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Changed evidence, revision conflict or locked economic period. */
                409: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description No usable catalog classification for the requested scope. */
                422: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Rate limit exceeded. */
                429: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Source or operational reader temporarily unavailable. */
                503: {
                    headers: {
                        "X-VAT-Environment": components["headers"]["VATEnvironment"];
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/tax-class/resolve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Resolve source VAT options for an exact CN or CPA code
         * @description Uses the same informational resolver as GET /v1/information/vat. Requires full, read-only, or classification-resolve scope. Returns source options and their conditions without assigning an authoritative tax class.
         */
        post: operations["resolveInformationalTaxClass"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/vat": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Inspect source-attributed informational VAT options
         * @description Read-only informational lookup, separate from governed classification and filing authority.
         *     Requires full or read-only API scope. Full CN (8 digit) or CPA (6 digit) item codes only.
         *     Latest unfiltered country capture is selected unless an immutable snapshot is pinned.
         *     Source request coverage and reported dates are never promoted to a legal-effective interval.
         *     All relevant numeric and nonnumeric alternatives are retained; no standard fallback.
         */
        get: operations["lookupInformationalVAT"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/information/vat/calculate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Calculate an ephemeral conditional VAT preview
         * @description Uses an exact numeric option from the informational lookup and the existing checked money engine.
         *     Requires full or read-only scope. No ledger, governed decision, approval or filing write occurs.
         *     An explicit option is required, including when alternatives exist. Nonnumeric treatments never
         *     imply a zero rate. Source uncertainty and unverified declarations remain visible after arithmetic.
         */
        post: operations["calculateInformationalVAT"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/country-vat-breakdown": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Union OSS Country VAT Breakdown Preview
         * @description Builds a read-only Union OSS country VAT breakdown preview from filing-grade `vat_supply_events`.
         *
         *     The result is grouped first by Member State of consumption and then by the Union OSS return structure:
         *     - `2a` services supplied from the Member State of identification
         *     - `2b` goods dispatched or transported from the Member State of identification
         *     - `2c` services supplied from fixed establishments in another Member State
         *     - `2d` goods dispatched or transported from another Member State
         *
         *     Requirements and current limits:
         *     - Requires exactly one overlapping `active` or `ended` `union_oss` registration for the requested quarter.
         *     - Reuses the same inclusion, exclusion, and quarter-end ECB conversion rules as the Union OSS quarterly summary preview.
         *     - Excludes source events whose `classification_status` is not `classified`, zero-rated, exempt, new-means-of-transport, and assembly/installation supplies.
         *     - Keeps separate line rows when more than one actual VAT rate applies within the same standard/reduced return grouping.
         *     - Refunds, cancellations, credit notes, and adjustments are included only when they can be linked to the original filed supply event, and earlier-quarter corrections are exposed as country-level correction rows.
         *     - Payable VAT is calculated per Member State of consumption, and negative per-state balances are excluded from the cross-country grand total.
         *     - Unsupported supply kinds, including `imported_goods` rows reserved for the IOSS flow, are surfaced through warnings/exclusions instead of being dropped silently.
         *     - Current implementation is a preview endpoint and does not persist return periods, filing states, or evidence drill-down pages yet.
         */
        get: operations["getUnionOSSCountryVATBreakdown"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/country-vat-breakdown/export": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Union OSS Country VAT Breakdown Export
         * @description Downloads the current Union OSS country VAT breakdown preview as an accountant-facing package.
         *
         *     The export reuses the same preview logic as `/v1/reports/country-vat-breakdown` and is intended
         *     for accountant review of the current quarter preview, not for filing-state persistence.
         *
         *     Format behavior:
         *     - `format=json` returns a manifest plus an export-specific report payload with major-unit amount strings, `vat_rate_pct` fields, country correction rows, and payable balances.
         *     - `format=csv` returns one line per country/regrouped return row or country correction row with manifest metadata repeated on each row.
         *     - When a quarter has no included rows, the CSV still contains a deterministic manifest-only nil-return row with empty detail columns.
         */
        get: operations["exportUnionOSSCountryVATBreakdown"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/filing-prep": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * OSS / IOSS Filing Prep Workspace
         * @description Returns an account-scoped OSS / IOSS filing-prep workspace for a selected quarter.
         *
         *     This endpoint does not create, lock, or submit a return. Instead, it combines the
         *     quarter deadline, registration coverage checks, Union OSS preview readiness, and the
         *     current IOSS monthly summaries into one response that a dashboard can use as a filing
         *     workspace.
         *
         *     Response behavior:
         *     - Reuses the same Union OSS preview rules, warning categories, nil-return logic, and per-state payable-balance logic when a quarter is previewable.
         *     - Encodes expected business blockers, such as missing registration coverage, overlapping registrations, or missing exchange rates, into explicit readiness states instead of returning 409/422 preview blockers.
         *     - Builds month-by-month IOSS summaries from committed imported-goods supply events, including exclusion counts and nil-return candidates for covered months.
         */
        get: operations["getOSSIOSSFilingPrepWorkspace"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/locked-return-periods/union-oss": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List Locked Union OSS Return Periods
         * @description Returns the most recent persisted Union OSS locked return periods for the authenticated account.
         *
         *     Locked return periods are immutable filing snapshots created from the accountant preview at the
         *     time of locking. When the optional `period` query parameter matches an existing locked quarter,
         *     the response also includes that quarter's immutable export artifacts.
         */
        get: operations["listLockedUnionOSSReturnPeriods"];
        put?: never;
        /**
         * Lock Union OSS Return Period
         * @description Persists an immutable Union OSS quarter snapshot for the authenticated account.
         *
         *     The lock operation freezes the current accountant preview, stores filing metadata for the quarter,
         *     and creates immutable JSON and CSV export artifacts for later download. Repeating the operation for
         *     the same quarter returns a conflict instead of replacing the existing snapshot.
         */
        post: operations["lockUnionOSSReturnPeriod"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/locked-return-periods/union-oss/exports/{exportID}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Download Locked Union OSS Export Artifact
         * @description Downloads an immutable export artifact generated when a Union OSS quarter was locked.
         *
         *     Export artifacts are account-scoped, immutable, and can be downloaded after a period is locked or
         *     marked filed. The response returns the stored artifact bytes with the original filename.
         */
        get: operations["downloadLockedUnionOSSExportArtifact"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/locked-return-periods/union-oss/filed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Mark Locked Union OSS Return Period Filed
         * @description Marks an existing locked Union OSS return period as filed.
         *
         *     The first filed transition records the filed timestamp and audit metadata. Repeat requests keep the
         *     original filing audit fields and return the persisted quarter snapshot rather than regenerating exports.
         */
        post: operations["markLockedUnionOSSReturnPeriodFiled"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/multi-jurisdiction": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * OSS / IOSS Multi-jurisdiction Preview
         * @description Returns a read-only OSS/IOSS filing exposure preview for a selected Union OSS quarter.
         *
         *     The European Commission states that OSS return details are split by Member State of
         *     consumption, that Union and non-Union OSS return periods are calendar quarters, and that
         *     the import scheme uses calendar months. This endpoint uses the existing Union OSS
         *     quarterly preview as the source of reportable jurisdiction totals, then adds month-by-month
         *     IOSS summaries for imported-goods events inside the selected quarter.
         *
         *     Response behavior:
         *     - Requires the same single overlapping `active` or `ended` `union_oss` registration as the existing Union OSS preview endpoints.
         *     - Reuses the same Union OSS inclusion, exclusion, warning, correction, and quarter-end ECB conversion rules as the summary and country-breakdown endpoints.
         *     - Groups included Union OSS lines by Member State of consumption and returns the preserved sections `2a`, `2b`, `2c`, and `2d` for each country, with report-line counts that include later-period correction rows.
         *     - Generates IOSS month summaries from committed imported-goods events, applying the EUR 150 intrinsic-value ceiling, excise exclusion, registration-window checks, and month-end ECB conversion for return totals.
         *     - Does not create, lock, submit, or persist a filed return.
         */
        get: operations["getOSSIOSSMultiJurisdictionPreview"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/oss-accountant-report": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Union OSS Accountant-Friendly Report
         * @description Returns a combined accountant-readable Union OSS quarter view for review before filing.
         *
         *     The European Commission states that Union OSS returns are quarterly, nil returns still matter
         *     when an active registration has no supplies in the period, and OSS records must remain available
         *     electronically for audit. This endpoint does not create, lock, or submit a filed return; it
         *     formats the current quarter preview for accountant review.
         *
         *     Response behavior:
         *     - Reuses the same registration-eligibility, warning, exclusion, and quarter-end ECB conversion rules as the preview endpoints.
         *     - Uses major-unit decimal strings and `vat_rate_pct` values throughout the summary and country regrouping sections.
         *     - Carries later-period correction rows and per-country payable balances alongside the current return lines.
         *     - Adds a filing context with the quarter due date plus a conservative nil-return candidate hint that is only true when zero source events were recorded for the quarter.
         *     - Keeps quarters with excluded or review-needed events out of the nil-return path until an accountant resolves the exclusions.
         */
        get: operations["getUnionOSSAccountantReport"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/oss-quarterly-summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Union OSS Quarterly Summary Preview
         * @description Builds a read-only Union OSS quarterly summary preview from filing-grade `vat_supply_events`.
         *
         *     The result is grouped according to the Union OSS return structure:
         *     - `2a` services supplied from the Member State of identification
         *     - `2b` goods dispatched or transported from the Member State of identification
         *     - `2c` services supplied from fixed establishments in another Member State
         *     - `2d` goods dispatched or transported from another Member State
         *
         *     Requirements and current limits:
         *     - Requires exactly one overlapping `active` or `ended` `union_oss` registration for the requested quarter.
         *     - Excludes source events whose `classification_status` is not `classified`, zero-rated, exempt, new-means-of-transport, and assembly/installation supplies.
         *     - Keeps separate rows when more than one actual VAT rate applies within the same standard/reduced return grouping.
         *     - Uses ECB rates from the last day of the quarter when conversion is required, including the return currency of the Member State of identification.
         *     - Refunds, cancellations, credit notes, and adjustments are included only when they can be linked to the original filed supply event. Same-quarter corrections net into the current return rows; earlier-quarter corrections are emitted as later-period correction rows.
         *     - Payable VAT is calculated per Member State of consumption, and a negative balance in one Member State does not offset VAT payable in another Member State.
         *     - Current implementation is a preview endpoint and does not persist return periods or filing states.
         */
        get: operations["getUnionOSSQuarterlySummary"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/oss-quarterly-summary/export": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Union OSS Quarterly Summary Export
         * @description Downloads the current Union OSS quarterly summary preview as an accountant-facing package.
         *
         *     The European Commission states that Union OSS returns are submitted quarterly in the Member
         *     State of identification and remain additional to domestic VAT returns. This endpoint does
         *     not create or lock a filed return; it exports the current preview state for accountant
         *     review.
         *
         *     Format behavior:
         *     - `format=json` returns a manifest plus an export-specific report payload with major-unit amount strings, `vat_rate_pct` fields, later-period correction rows, and per-state payable balances.
         *     - `format=csv` returns one line per Union OSS return row or correction row with manifest metadata repeated on each row.
         *     - When a quarter has no included rows, the CSV still contains a deterministic manifest-only nil-return row with empty detail columns.
         *     - Reuses the same registration-eligibility, warning, exclusion, and quarter-end ECB conversion rules as the preview endpoint.
         */
        get: operations["exportUnionOSSQuarterlySummary"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/sources": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List Source Profiles
         * @description Returns source profiles for the authenticated account together with the
         *     current active-profile count and cap. Requires a V2 API key with `full`
         *     or `read-only` scope.
         */
        get: operations["listSources"];
        put?: never;
        /**
         * Create Source Profile
         * @description Creates a managed source profile for the authenticated account. The
         *     `source_key` should match the stable raw `source_id` value used in VAT
         *     calculation or future import flows. Optional `aliases` let multiple
         *     observed raw source IDs resolve to the same managed profile. Requires a
         *     V2 API key with `full` scope.
         */
        post: operations["createSource"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/sources/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Update Source Profile
         * @description Updates source-profile metadata or archive state for the authenticated
         *     account. `source_key` is intentionally immutable in this version, but
         *     aliases can be replaced in full on each update.
         *     Send an empty string for optional string fields to clear them; `null`
         *     or omission leaves the existing value unchanged.
         *     Requires a V2 API key with `full` scope.
         */
        patch: operations["updateSource"];
        trace?: never;
    };
    "/v1/sources/unknown": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List Unknown Source Tags
         * @description Lists raw `source_id` values observed in transactions for the
         *     authenticated account that are not yet mapped to a source profile.
         *     Requires a V2 API key with `full` or `read-only` scope.
         */
        get: operations["listUnknownSources"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/supplies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List committed supply revisions
         * @description Returns this account's API-committed revisions, newest first. Use an operational full or read-only key. Reporting uses the current revision for each economic event. These rows are separate from /v1/transactions.
         */
        get: operations["listCommittedSupplyEvents"];
        put?: never;
        /**
         * Commit a sale or correction
         * @description Persists customer-submitted operational evidence and queues informational VAT processing for
         *     Transaction Ledger, Filing Prep, and reporting. Requires an operational key with full scope.
         *     A sandbox key cannot write here. This operation does not submit a return, verify the factual
         *     declaration independently, or create an API calculation audit entry.
         *     Sale identity is source profile, external order and line. Corrections add a stable
         *     external_event_id and an original sale UUID belonging to the same source. A byte-independent
         *     replay of the same normalized facts and version returns the same ID. Use a higher
         *     version to append a revision in an open period. Reusing a version with different
         *     facts or sending a previously unused lower version returns 409.
         */
        post: operations["commitSupplyEvent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/supplies/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get one committed supply revision
         * @description Returns a retained revision owned by the authenticated account. Use an operational full or read-only key. Foreign and absent IDs are indistinguishable.
         */
        get: operations["getCommittedSupplyEvent"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/tax-classes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List Tax Classes
         * @description List curated tax classes with optional filtering by group, tag, and search query.
         *
         *     **Query Parameters:**
         *     - `group` (optional): Group slug (e.g. `books_publications`)
         *     - `tag` (optional): Tag slug (e.g. `publications`)
         *     - `q` (optional): Search query matched against id, name, description
         *     - `country` (optional): ISO alpha-2 country code to include preview rate
         *     - `at` (optional): Recorded-window lookup date (RFC3339 or YYYY-MM-DD). Defaults to current UTC time.
         */
        get: operations["listTaxClasses"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/tax-classes/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Tax Class Detail
         * @description Retrieve one tax class with country-rate rows selected from recorded/imported windows at a
         *     specific date. Current live change windows are not yet guaranteed legal applicability.
         */
        get: operations["getTaxClass"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/tax-registrations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List OSS / IOSS Tax Registrations
         * @description Returns OSS and IOSS registration metadata for the authenticated account.
         *     Records are account-scoped and ordered by most recent effective window.
         *     Only masked identifiers are exposed. Requires a V2 API key with `full`
         *     or `read-only` scope.
         */
        get: operations["listTaxRegistrations"];
        put?: never;
        /**
         * Create OSS / IOSS Tax Registration
         * @description Creates a scheme registration for the authenticated account. The backend
         *     rejects overlapping non-excluded effective windows within the same
         *     scheme. Submit the full scheme-specific identifier. The response only
         *     exposes its masked form and a details-completeness flag. Use
         *     `status=excluded` for stale or duplicate overlapping rows; `status=ended`
         *     requires `effective_to`. Requires a V2 API key with `full` scope.
         */
        post: operations["createTaxRegistration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/tax-registrations/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Update OSS / IOSS Tax Registration
         * @description Updates registration metadata for the authenticated account. Scheme type
         *     is immutable in this version. Omit `registration_identifier` to keep
         *     the existing evidence, or supply the full replacement identifier.
         *     Send an empty string for `effective_to` to clear the end date. `status=ended` requires `effective_to`; use
         *     `status=excluded` when retiring a stale or duplicate overlapping row.
         *     Requires a V2 API key with `full` scope.
         */
        patch: operations["updateTaxRegistration"];
        trace?: never;
    };
    "/v1/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List Transactions
         * @description Query VAT transaction history for the authenticated account.
         *     Requires a V2 API key with `full` or `read-only` scope.
         *     Uses cursor-based pagination.
         */
        get: operations["listTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/transactions/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Transaction Calculation Evidence
         * @description Returns one tenant-owned API calculation audit record. The permanent identity invariant is
         *     `calculation_id === id`. Historical transactions without Phase C evidence are labelled
         *     `legacy_unverifiable`; shadow expected-treatment evidence is separate and cannot upgrade
         *     this recorded-calculation status.
         */
        get: operations["getTransaction"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/transactions/aggregated": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Aggregated Transactions
         * @description Returns aggregated transaction totals grouped by country, tax class, or month.
         *     Amounts are reported in EUR cents; non-EUR transactions are converted with ECB
         *     reference rates where available. Requires a V2 API key with `full` or `read-only` scope.
         *     Returns HTTP 409 `summary_amount_overflow` if a total exceeds the signed
         *     64-bit minor-unit reporting range. Narrow the date range or filters; no
         *     partial or wrapped totals are returned.
         */
        get: operations["aggregateTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/transactions/export": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Export Transactions (CSV)
         * @description Download transaction data as CSV. Maximum date range: 367 days.
         *     Requires a V2 API key with `full` or `read-only` scope.
         */
        get: operations["exportTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/vat/calculate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Calculate VAT
         * @description Calculates net, VAT, and gross amounts from a VAT-inclusive or VAT-exclusive input.
         *
         *     **Amount basis and compatibility field**: `gross_amount_minor` is the established input
         *     field name and is retained for API compatibility. When `price_includes_vat` is `true`, the
         *     field is a gross input and VAT is extracted. When `false`, the field is a net input and VAT
         *     is added. Send `price_includes_vat` explicitly for every request, including `false` for a
         *     net input; omitted or `null` values are rejected.
         *
         *     **Rounding**: Calculations use integer minor units and round the VAT fraction half up.
         *     For inclusive input, VAT is rounded first and net is derived as gross minus VAT. For
         *     exclusive input, VAT is rounded first and gross is derived as net plus VAT. Responses
         *     always satisfy `gross_amount_minor = net_amount_minor + vat_amount_minor`.
         *
         *     **Validation**: Input amounts must be non-negative. Resolved rates must be from 0% through
         *     1000% inclusive. A rate outside that range or an exclusive result that would overflow a
         *     signed 64-bit monetary amount returns `400 invalid_request`.
         *
         *     **Monetary Amounts**: All monetary values are expressed in minor units (cents for EUR/USD):
         *     - 10000 = €100.00
         *     - 119000 = €1,190.00
         *
         *     **VAT Rates**: Expressed in basis points (1 bp = 0.01%):
         *     - 700 bps = 7%
         *     - 1900 bps = 19%
         *
         *     **Ownership and evidence**: With API-key v2 enabled, authentication is required and a
         *     successful call atomically stores the transaction and calculation evidence. The returned
         *     `calculation_id` is the existing transaction UUID. If API-key v2 is disabled, compatibility
         *     mode permits an unowned calculation but persists no transaction, evidence, or idempotency
         *     mapping; `calculation_id` is null and replay is ineligible.
         *
         *     **Transaction Date**: Optional field that defaults to current UTC time if omitted.
         *     Accepts RFC3339 (e.g., "2024-03-15T14:30:00Z") or YYYY-MM-DD (e.g., "2024-03-15") format.
         *     Date-only input resolves to midnight UTC. The resolved timestamp is always returned.
         *     `transaction_date` is required when `Idempotency-Key` is supplied.
         *
         *     **Idempotency**: An optional `Idempotency-Key` is tenant- and endpoint-scoped. An identical
         *     canonical request and normalized `X-Source-ID` return the original calculation; reuse with
         *     a different request body or source attribution returns `409 idempotency_conflict`. The raw
         *     key is never stored. Idempotency requires authentication.
         *
         *     **Cache**: Results are cached in Redis for improved performance.
         */
        post: operations["calculateVat"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/vat/rates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Lookup Recorded VAT Rate
         * @description Retrieve the recorded VAT-rate row selected for a specific country, tax class, and date.
         *     Current live TEDB change windows can reflect apply time and are not yet guaranteed to prove
         *     the legal applicability interval or exact upstream snapshot.
         *
         *     **Use cases:**
         *     - Debug VAT rate configuration
         *     - Preview rates before calculation
         *     - Inspect recorded rate lookup windows
         *     - Display rates to customers in advance
         *
         *     **Query Parameters:**
         *     - `country` (required): ISO 3166-1 alpha-2 country code (`GR` for Greece)
         *     - `tax_class_id` (required): Tax class identifier
         *     - `at` (optional): Recorded-window lookup date (RFC3339 or YYYY-MM-DD format). Defaults to current UTC time.
         *
         *     **Cache:** Results are cached in Redis for improved performance.
         */
        get: operations["getVatRate"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/vat/sme-eligibility": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * SME Eligibility Check
         * @description Check domestic SME VAT exemption eligibility (Art. 284 VAT Directive) based on
         *     annual turnover and country. Does not evaluate the EU cross-border SME scheme (Art. 284a).
         *     Public endpoint — no authentication required (IP rate-limited).
         *
         *     Compares the supplied annual domestic turnover (in national currency minor units) against the
         *     TEDB-sourced national exemption threshold for the given country. Returns eligibility status,
         *     threshold amounts, policy details, and any sector-specific sub-thresholds.
         */
        post: operations["checkSmeEligibility"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/vat/sme-thresholds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List SME Thresholds
         * @description Retrieve EU SME scheme exemption thresholds sourced from the official EU TEDB
         *     SMERetrievalService SOAP API.
         *
         *     Returns the most recent threshold record per `(country, tax_name, threshold_type)` key
         *     as of the requested `date`. When a country has multiple schemes or tax names, each
         *     appears as a separate item in the response.
         *
         *     **Amounts**: All monetary amounts are in whole currency units (EUR or the national
         *     currency identified by `nationalCurrency`). Null indicates the field is not published
         *     for that country/scheme combination.
         *
         *     **Country codes**: TEDB uses `EL` for Greece (instead of the ISO 3166-1 `GR`).
         *
         *     **Query Parameters:**
         *     - `country` (optional): ISO alpha-2 country code filter (e.g. `DE`, `EL` for Greece).
         *     - `date` (optional): YYYY-MM-DD. Defaults to today UTC. Returns the most recent threshold
         *       per key with `situation_on ≤ date`.
         *     - `taxName` (optional): Case-insensitive exact match on the `taxName` field (e.g. `VAT`).
         *     - `tax_name` (optional, deprecated): legacy snake_case alias for `taxName`.
         */
        get: operations["listSmeThresholds"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/vat/threshold-check": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Threshold Check
         * @description Check a VAT threshold. Behavior depends on the threshold type:
         *     - **OSS**: Selects the approved immutable Article 59c policy for the supplier's
         *       establishment Member State and evaluates candidate net turnover for both the current and
         *       preceding calendar years at the authenticated source-event cutoff. Zero/exempt and
         *       review-pending candidates remain in coverage. Missing classification, statutory scope,
         *       source time, establishment, or governed currency evidence returns 422 rather than a
         *       partial exceeded/remaining result. Daily ECB reporting FX is not legal threshold evidence.
         *     - **IOSS**: Validates a single consignment amount against the €150 threshold (Art. 369l).
         *       No transaction aggregation is performed.
         *
         *     Requires a V2 API key with `full` or `read-only` scope.
         */
        post: operations["checkThreshold"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/vat/thresholds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List VAT Thresholds
         * @description Retrieve EU VAT thresholds (OSS and IOSS). Public endpoint — no authentication required.
         *     Results are cached for 1 hour.
         */
        get: operations["listVatThresholds"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        AggregateResponse: {
            /**
             * @description Non-EUR currencies converted anywhere in the response.
             * @example [
             *       "USD",
             *       "GBP"
             *     ]
             */
            converted_currencies?: string[];
            /** @description Human-readable conversion note. */
            disclaimer?: string;
            /**
             * @description Backward-compatible flag; true when some non-EUR rows could not be converted and were excluded.
             * @example false
             */
            eur_only?: boolean;
            /**
             * @example country
             * @enum {string}
             */
            group_by: "country" | "tax_class" | "month";
            period: {
                /**
                 * Format: date
                 * @example 2026-01-01
                 */
                from: string;
                /**
                 * Format: date
                 * @example 2026-03-31
                 */
                to: string;
            };
            rows: components["schemas"]["AggregateRow"][];
            /**
             * @description Non-EUR currencies excluded anywhere in the response because no ECB rate was found.
             * @example [
             *       "TRY"
             *     ]
             */
            unconverted_currencies?: string[];
        };
        AggregateRow: {
            /**
             * @description Non-EUR currencies converted in this group.
             * @example [
             *       "USD"
             *     ]
             */
            converted_currencies?: string[];
            /**
             * @description Backward-compatible flag; true when one or more non-EUR rows in this group could not be converted and were excluded.
             * @example false
             */
            eur_only?: boolean;
            /**
             * Format: int64
             * @description Total gross amount in EUR minor units after conversion.
             * @example 499800
             */
            gross_amount_minor: bigint;
            /**
             * @description Group key (country code, tax class ID, or month)
             * @example DE
             */
            key: string;
            /**
             * Format: int64
             * @description Total net amount in EUR minor units after conversion.
             * @example 420000
             */
            net_amount_minor: bigint;
            /**
             * Format: int64
             * @example 42
             */
            transaction_count: bigint;
            /**
             * @description Non-EUR currencies excluded in this group because no ECB rate was found.
             * @example []
             */
            unconverted_currencies?: string[];
            /**
             * Format: int64
             * @description Total VAT amount in EUR minor units after conversion.
             * @example 79800
             */
            vat_amount_minor: bigint;
        };
        Article59cCanonicalMoney: {
            amount_minor: string;
            currency: string;
            scale: string;
        };
        Article59cCoverageGroup: {
            /** @enum {string} */
            disposition: "included" | "conclusively_excluded" | "unresolved";
            event_count: string;
            /** @enum {string} */
            evidence_quality: "complete" | "missing" | "conflicting";
            /** @enum {string} */
            materiality: "material" | "immaterial";
            original_currency?: string;
            reason_code: string;
        };
        /** @description Public crossing provenance. Internal database identifiers and source-evidence digests are intentionally not exposed. */
        Article59cCrossingEvidence: {
            cumulative_after: components["schemas"]["Article59cCanonicalMoney"];
            cumulative_before: components["schemas"]["Article59cCanonicalMoney"];
            /** Format: date-time */
            source_event_time: string;
        };
        Article59cEvidenceIncompleteResponse: {
            /** Format: date-time */
            cutoff_at: string;
            /** @enum {string} */
            error: "article_59c_evidence_incomplete" | "article_59c_not_applicable";
            /** @enum {string} */
            evidence_status: "incomplete_evidence" | "conflicting_evidence";
            issues: string[];
        };
        Article59cTreatmentTrigger: {
            causal: boolean;
            dependency_digest?: string;
            dependency_revision?: string;
            /** Format: date */
            effective_cessation_at?: string;
            /** Format: date */
            effective_from: string;
            /** @enum {string} */
            kind: "voluntary_destination_taxation_option" | "union_oss_deemed_option" | "current_year_threshold_crossing" | "preceding_year_threshold_exceeded";
            /** Format: date */
            minimum_bound_through?: string;
        };
        AuthContext: {
            context_id: components["schemas"]["AuthContextID"];
            /**
             * @description Matches X-VAT-Environment. Operational keys return production on every deployment.
             * @enum {string}
             */
            environment: "sandbox" | "production";
            /**
             * @description Scope strings assigned to the authenticated key. Customer scopes include full, read-only, calculate-only and classification-resolve.
             * @example [
             *       "calculate-only"
             *     ]
             */
            scopes: string[];
        };
        /** @example ctx_590f1b59b9cf255b642ea90a1503572e60e821397aae3ae0088408d818128380 */
        AuthContextID: string;
        CalculationProvenance: {
            calculation_version: string;
            /** @enum {string} */
            evidence_status: "captured" | "legacy_unverifiable" | "unavailable" | "not_persisted";
            /** @description Empty only for legacy calculations whose executable version cannot be established. */
            execution_digest: string;
            /** @enum {string} */
            ownership: "tenant_owned" | "unowned";
            /**
             * @description Retained eligibility metadata. New calculations in the informational CORE release
             *     cannot produce the sealed, approved rate evidence required for exact replay.
             *     `ineligible` means the record lacks sufficient evidence or otherwise fails eligibility.
             *     `not_supported` is the compatibility status for records without replay support.
             *     `available` is reserved for records that meet the sealed-evidence requirements.
             *     Exact replay is deferred from the current customer release.
             * @enum {string}
             */
            replay_status: "not_supported" | "ineligible" | "available";
            /** @enum {string} */
            schema_version: "calculation-evidence/v1";
        };
        ClassificationCatalogBinding: {
            catalog_digest: string;
            catalog_version: string;
            /** Format: uri */
            official_reference: string;
            /** Format: date-time */
            valid_from: string;
            /** Format: date-time */
            valid_to?: string;
        };
        ClassificationInformationalCode: {
            catalog: components["schemas"]["ClassificationCatalogBinding"];
            display_code: string;
            exact_code: string;
            is_leaf: boolean;
            /** Format: date-time */
            knowledge_time: string;
            official_description: string;
            /** @enum {string} */
            schema_version: "classification-information/v1";
            /** @enum {string} */
            scheme: "cn" | "cpa";
            /** Format: date-time */
            source_retrieved_at: string;
            source_sha256: string;
        };
        CommittedSupplyEventInput: {
            arrival_country?: string;
            /** @description Optional exact catalogue declaration for a sale. Refunds and corrections inherit classification from the original sale. */
            classification?: {
                catalog_version?: string;
                code: string;
                /** @enum {string} */
                scheme: "cn" | "cpa";
            };
            /** @description Customer explanation only. Zero-consideration sales require an explanation and supporting evidence. */
            classification_reason?: string;
            consignment_currency?: string;
            consignment_currency_scale?: number;
            /** Format: int64 */
            consignment_intrinsic_value_minor?: bigint;
            currency: string;
            currency_scale: number;
            /**
             * @default unknown
             * @enum {string}
             */
            customer_type: "b2c" | "b2b" | "unknown";
            /** @description Customer-submitted item groupings for reference. They never establish authenticated customs completeness or relief. */
            customs_declaration_items?: {
                declaration_line_reference?: string;
                description: string;
                origin_country?: string;
                tariff_classification: string;
            }[];
            /**
             * Format: date-time
             * @description Customer-declared actual payment acceptance for an imported-goods sale. Must match the UTC supply date.
             */
            declared_payment_accepted_at?: string;
            dispatch_country?: string;
            /** @enum {string} */
            event_type: "sale" | "refund" | "cancellation" | "credit_note" | "adjustment";
            /** Format: int64 */
            event_version: bigint;
            /** @description Optional supporting JSON object up to 16 KiB. Reserved system facts supplied within it have no effect. */
            evidence?: Record<string, never>;
            /** @description Provide an explicit value for an IOSS preview. */
            excise_goods?: boolean;
            /** @description Required for a refund or correction. Omit for a sale. */
            external_event_id?: string;
            external_line_id: string;
            external_order_id: string;
            fixed_establishment_country?: string;
            /**
             * Format: int64
             * @description Taxable amount plus source VAT when reported.
             */
            gross_amount_minor: bigint;
            import_origin_country?: string;
            /** @description Explicit fact needed for Union OSS preparation on goods. */
            is_assembly_or_installation?: boolean;
            /** @description Explicit fact needed for Union OSS preparation on goods. */
            is_new_means_of_transport?: boolean;
            marketplace_deemed_supplier?: boolean;
            /** @description Actual EU destination. Missing destination requires review. */
            member_state_consumption?: string;
            /** @description Customer-submitted observations. They do not establish official treatment or independently verified upstream identity. */
            observed_tax_lines?: {
                /** Format: int64 */
                amount_minor?: bigint;
                derived?: boolean;
                jurisdiction_country?: string;
                /** @enum {string} */
                kind: "vat" | "duty" | "fee" | "unknown";
                merchant_liable?: boolean;
                /** @enum {string} */
                origin: "platform_calculated" | "merchant_supplied" | "marketplace_supplied" | "external_tax_service" | "unknown";
                rate_bps?: number;
                source_provider?: string;
                source_title?: string;
            }[];
            /** @description Price basis used by the source. Provide an explicit value for automatic VAT calculation. */
            prices_include_tax?: boolean;
            /** @description Optional stable identifier for matching saved rate choices within this Source Profile. */
            product_reference?: string;
            /**
             * Format: int64
             * @description VAT reported by the source. When omitted gross and taxable amounts must be equal.
             */
            source_vat_amount_minor?: bigint;
            supplier_establishment_country?: string;
            /** Format: date */
            supply_date: string;
            /** @enum {string} */
            supply_kind: "goods" | "tbe_service" | "service" | "imported_goods";
            /**
             * Format: date-time
             * @description Customer-declared instant on the UTC supply date. Needed for operational Article 59c evidence.
             */
            supply_occurred_at?: string;
            /** Format: int64 */
            taxable_amount_minor: bigint;
            variant_reference?: string;
        };
        CommittedSupplyInput: {
            event: components["schemas"]["CommittedSupplyEventInput"];
            /**
             * Format: uuid
             * @description Required for corrections. Omit for sales.
             */
            original_supply_event_id?: string;
            /** @description Decimal ID of an active Source Profile owned by this account. */
            source_profile_id: string;
        };
        CommittedSupplyReceipt: {
            /** @enum {string} */
            event_type: "sale" | "refund" | "cancellation" | "credit_note" | "adjustment";
            event_version: string;
            /** Format: uuid */
            id: string;
            /** @enum {string} */
            provenance: "api_committed_supply/v1";
            /** @enum {string} */
            result: "imported" | "duplicate";
            source_id: string;
            source_profile_id: string;
            /** Format: date */
            supply_date: string;
        };
        CommittedSupplyRecord: {
            arrival_country?: string | null;
            classification_reason?: string;
            /** @description Retained source status. Processing and reporting are projected independently. */
            classification_status?: string;
            /** Format: date-time */
            created_at?: string;
            currency: string;
            currency_scale: number;
            customer_type?: string;
            dispatch_country?: string | null;
            /** @enum {string} */
            event_type: "sale" | "refund" | "cancellation" | "credit_note" | "adjustment";
            event_version: string;
            external_event_id?: string | null;
            external_line_id: string;
            external_order_id: string;
            gross_amount_minor: string;
            /** Format: uuid */
            id: string;
            member_state_consumption?: string;
            /** Format: uuid */
            original_supply_event_id?: string | null;
            prices_include_tax?: boolean;
            /** @enum {string} */
            provenance: "api_committed_supply/v1";
            /** @description Retained source category. */
            rate_category?: string;
            source_id: string;
            source_profile_display_name?: string | null;
            source_profile_id: string;
            /** @description False means the retained zero is a placeholder rather than reported source VAT. */
            source_vat_reported: boolean;
            supplier_establishment_country?: string | null;
            /** Format: date */
            supply_date: string;
            supply_kind?: string;
            taxable_amount_minor: string;
            /** Format: date-time */
            updated_at?: string;
            vat_amount_minor: string;
            vat_engine_treatment?: {
                /** Format: uuid */
                original_sale_event_id?: string;
                provisional?: boolean;
                rate_bps?: number;
                source_option_id?: string;
                source_row_digest?: string;
                source_snapshot_id?: string;
                source_value_type?: string;
            };
            /** @enum {string} */
            vat_processing_status?: "queued" | "review" | "calculated" | "locked" | "no_charge";
            /** @description Retained legacy source field. Use vat_engine_treatment for a calculated rate. */
            vat_rate_bps?: number;
        };
        ComplianceStatusResponse: {
            /**
             * @description Separate applicability state; threshold evidence alone does not prove sole establishment
             * @enum {string}
             */
            article_59c_applicability_status: "applicable" | "not_applicable" | "incomplete_evidence" | "conflicting_evidence";
            /** @description Array of threshold check results (OSS only) */
            checks: components["schemas"]["ThresholdCheckResponse"][];
            /**
             * @deprecated
             * @description Compatibility field; governed Article 59c evaluation does not use daily reporting conversion
             */
            converted_currencies?: string[];
            /** Format: int64 */
            current_year_blocking_event_count: bigint;
            /** Format: int64 */
            current_year_candidate_event_count: bigint;
            current_year_coverage: components["schemas"]["Article59cCoverageGroup"][];
            /** Format: int64 */
            current_year_excluded_event_count: bigint;
            /** @description Threshold-evidence boundary; incomplete closing evidence after a proven historical crossing is distinguished from a state with no publishable exceeded/remaining conclusion */
            disclaimer: string;
            /**
             * @deprecated
             * @description Compatibility field; true means governed threshold evidence is incomplete
             */
            eur_only: boolean;
            /** @enum {string} */
            evidence_status: "resolved" | "incomplete_evidence" | "conflicting_evidence" | "not_applicable";
            /** @enum {string} */
            filing_readiness: "ready" | "not_ready" | "unknown" | "unsupported" | "blocked_by_treatment" | "not_required";
            /** @description True when immutable current- or preceding-year evidence proves a first crossing, even if closing evidence is incomplete */
            historical_crossing_proven: boolean;
            /** @description Bounded evidence-gap codes */
            issues?: string[];
            /** Format: date */
            legal_effective_date: string;
            /** @description Included period used for the threshold status calculation */
            period: {
                /**
                 * Format: date
                 * @example 2026-01-01
                 */
                from: string;
                /**
                 * Format: date
                 * @example 2026-04-21
                 */
                to: string;
            };
            /** Format: int64 */
            preceding_year_blocking_event_count: bigint;
            /** Format: int64 */
            preceding_year_candidate_event_count: bigint;
            preceding_year_coverage: components["schemas"]["Article59cCoverageGroup"][];
            /** Format: int64 */
            preceding_year_excluded_event_count: bigint;
            primary_treatment_driver: string;
            /** @enum {string} */
            threshold_evidence_status: "complete" | "incomplete" | "conflicting" | "not_applicable";
            treatment_triggers: components["schemas"]["Article59cTreatmentTrigger"][];
            /** @description Distinct currencies awaiting an approved statutory conversion policy */
            unconverted_currencies?: string[];
        };
        CreateSourceProfileRequest: {
            /** @default true */
            active: boolean;
            /**
             * @description Optional alternate raw source IDs that should resolve to this profile.
             * @example [
             *       "headless-eu",
             *       "webshop-eu"
             *     ]
             */
            aliases?: string[];
            /**
             * @example owned_store
             * @enum {string}
             */
            channel_type: "owned_store" | "marketplace" | "subscription" | "pos" | "wholesale" | "test" | "other";
            /** @example DE */
            default_country?: string | null;
            /** @example EUR */
            default_currency?: string | null;
            dispatch_country?: string | null;
            /**
             * Format: date
             * @description Optional effective date of the supplier's dispatch declaration.
             */
            dispatched_without_supplier_installation_from?: string | null;
            /** @example Headless EU Checkout */
            display_name: string;
            /** @default false */
            marketplace_deemed_supplier: boolean;
            /** @example Custom storefront */
            platform?: string | null;
            /** @example headless-checkout-eu */
            source_key: string;
            supplier_establishment_country?: string | null;
        };
        CreateTaxRegistrationRequest: {
            /**
             * Format: date
             * @example 2026-05-01
             */
            effective_from: string;
            /**
             * Format: date
             * @example null
             */
            effective_to?: string | null;
            /**
             * @description EU Member State code used as the Member State of identification for the scheme.
             * @example DE
             * @enum {string}
             */
            member_state_identification: "AT" | "BE" | "BG" | "CY" | "CZ" | "DE" | "DK" | "EE" | "EL" | "ES" | "FI" | "FR" | "HR" | "HU" | "IE" | "IT" | "LT" | "LU" | "LV" | "MT" | "NL" | "PL" | "PT" | "RO" | "SE" | "SI" | "SK";
            /** @description Full identifier issued for the scheme. Union OSS uses the VAT identification number of the selected Member State, Non-Union OSS uses EU followed by nine digits, and IOSS uses IM followed by nine digits. Format checks establish customer-declared evidence. */
            registration_identifier: string;
            /**
             * @example ioss
             * @enum {string}
             */
            scheme_type: "union_oss" | "non_union_oss" | "ioss";
            /**
             * @description Registration lifecycle state. `ended` requires `effective_to`; `excluded` is for rows that should not count toward coverage.
             * @example active
             * @enum {string}
             */
            status: "active" | "pending" | "ended" | "excluded";
        };
        CustomerAnnualArticle59c: {
            /** @enum {string} */
            applicability_reason?: "multiple_establishments" | "establishment_outside_eu";
            article_59c: components["schemas"]["CustomerArticle59c"];
            /** Format: date */
            as_of: string;
            /** @enum {string} */
            coverage_status: "incomplete" | "complete_customer_data";
            customer_declarations: components["schemas"]["CustomerOSSDeclarations"];
            customer_declarations_revision: number;
            disclaimer: string;
            exceeded_amount_minor: string | null;
            /** @enum {boolean} */
            filing_ready: false;
            /** @enum {boolean} */
            informational_only: true;
            issues: components["schemas"]["CustomerOSSIssue"][];
            observed_imported_amounts: components["schemas"]["CustomerObservedImported"][];
            observed_progress_percent: string | null;
            /** @enum {string} */
            previous_comparison: "unknown" | "at_or_below" | "above" | "not_applicable";
            previous_year_scenario?: components["schemas"]["CustomerPreviousYearScenario"];
            progress_percent: string | null;
            qualifying_countries: string[];
            quarters: components["schemas"]["CustomerArticle59cQuarter"][];
            recent_qualifying_activity: components["schemas"]["CustomerOSSActivity"][];
            remaining_amount_minor: string | null;
            /** @enum {string} */
            schema_version: "customer-article59c-annual/v1";
            /** @enum {boolean} */
            simulated?: true;
            year: number;
            /** @enum {string} */
            year_status: "in_progress" | "completed" | "future";
        };
        /** @description Observed current and previous calendar-year amounts in their respective reporting currencies. A threshold of "-1" indicates that the threshold is unavailable. */
        CustomerArticle59c: {
            /** @enum {string} */
            comparison: "unknown" | "at_or_below" | "above" | "not_applicable";
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            current_amount_minor: string;
            current_crossing?: components["schemas"]["CustomerArticle59cCrossingEvidence"];
            current_included_count: number;
            exceeded: boolean | null;
            excluded_count: number;
            previous_amount_minor: string;
            previous_crossing?: components["schemas"]["CustomerArticle59cCrossingEvidence"];
            previous_currency: string;
            /** Format: int32 */
            previous_currency_scale: number;
            previous_included_count: number;
            previous_threshold_amount_minor: string;
            threshold_amount_minor: string;
            unresolved_count: number;
        };
        CustomerArticle59cCrossingEvidence: {
            cumulative_after: components["schemas"]["Article59cCanonicalMoney"];
            cumulative_before: components["schemas"]["Article59cCanonicalMoney"];
            semantic_evidence_digest: string;
            /** Format: date-time */
            source_event_time: string;
            source_revision_id: string;
            supply_event_id: string;
        };
        CustomerArticle59cQuarter: {
            event_count: number;
            excluded_count: number;
            /** Format: date */
            from: string;
            included_count: number;
            net_amount_minor: string;
            period: string;
            /** @enum {string} */
            state: "in_progress" | "completed" | "future";
            /** Format: date */
            through: string;
            unresolved_count: number;
        };
        /** @description Registration-independent monthly IOSS preview with amounts in the report currency. Rows, issues and warnings can be empty. */
        CustomerIOSSReport: {
            /** Format: date */
            as_of: string;
            currency: string;
            excluded_source_event_count: number;
            /** @enum {boolean} */
            filing_ready: false;
            included_source_event_count: number;
            /** @enum {boolean} */
            informational_only: true;
            issues: components["schemas"]["CustomerOSSIssue"][];
            period: string;
            period_open: boolean;
            /** @enum {string} */
            report_mode: "registration_independent_preview" | "simulated";
            rows: components["schemas"]["CustomerIOSSRow"][];
            /** @enum {string} */
            schema_version: "customer-operational-ioss/v1";
            /** @enum {boolean} */
            simulated?: true;
            source_event_count: number;
            /** @enum {boolean} */
            submitted: false;
            warnings: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        /**
         * @example {
         *       "member_state_consumption": "DE",
         *       "rate_category": "provisional",
         *       "vat_rate_bps": 1900,
         *       "taxable_amount_minor": "0",
         *       "vat_amount_minor": "-1900",
         *       "source_event_count": 1,
         *       "original_month": "2026-08"
         *     }
         */
        CustomerIOSSRow: {
            member_state_consumption: string;
            original_month?: string;
            /** @enum {string} */
            rate_category: "standard" | "reduced" | "provisional";
            source_event_count: number;
            source_provenances?: string[];
            taxable_amount_minor: string;
            vat_amount_minor: string;
            vat_rate_bps: number;
        };
        CustomerObservedImported: {
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            event_count: number;
            net_amount_minor: string;
            year: number;
        };
        CustomerOperationalAmount: {
            gross_amount_minor: string;
            net_amount_minor: string;
            source_event_count: number;
            vat_amount_minor: string;
        };
        CustomerOperationalBreakdown: {
            country: string;
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            /** @enum {string} */
            event_type: "sale" | "refund" | "cancellation" | "credit_note" | "adjustment";
            gross_amount_minor: string;
            net_amount_minor: string;
            original_period?: string;
            rate_bps: number;
            /** @enum {string} */
            rate_provenance: "retained_source" | "provisional_product" | "provisional_store_default";
            source_event_count: number;
            vat_amount_minor: string;
        };
        CustomerOperationalCurrency: {
            calculated_adjustments: components["schemas"]["CustomerOperationalAmount"];
            combined: components["schemas"]["CustomerOperationalAmount"];
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            imported: components["schemas"]["CustomerOperationalAmount"];
            imported_adjustments: components["schemas"]["CustomerOperationalAmount"];
            imported_sales: components["schemas"]["CustomerOperationalAmount"];
            provisional: components["schemas"]["CustomerOperationalAmount"];
            source_backed: components["schemas"]["CustomerOperationalAmount"];
            unresolved: components["schemas"]["CustomerOperationalAmount"];
        };
        CustomerOperationalDefaultScope: {
            country: string;
            /** @enum {string} */
            customer_type: "b2b" | "b2c";
            /** Format: date */
            effective_from: string;
            /** Format: int64 */
            integration_id: bigint;
            sale_count: number;
            store: string;
            /** @enum {string} */
            supply_kind: "goods" | "service" | "tbe_service" | "imported_goods";
        };
        CustomerOperationalEstimate: {
            breakdown: components["schemas"]["CustomerOperationalBreakdown"][];
            currencies: components["schemas"]["CustomerOperationalCurrency"][];
            default_scopes: components["schemas"]["CustomerOperationalDefaultScope"][];
        };
        CustomerOSSActivity: {
            country: string;
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            /** Format: date */
            date: string;
            event_id: string;
            /** @enum {string} */
            event_type: "sale" | "refund" | "cancellation" | "credit_note" | "adjustment";
            net_amount_minor: string;
        };
        CustomerOSSApplicabilityFact: {
            classification?: components["schemas"]["CustomerVATCatalogClassification"];
            provenance: string;
            source_profile?: components["schemas"]["CustomerOSSInstallationSourceProfile"];
            value: boolean | null;
        };
        CustomerOSSContextRequest: {
            /**
             * Format: date
             * @description Reconciled coverage date or assumptions reference date when source coverage is incomplete. Cannot be in the future.
             */
            coverage_through: string;
            /**
             * Format: date
             * @description Actual effective date of an existing customer-declared election, not an election performed by this API.
             */
            destination_taxation_option_from?: string;
            establishment_country: string;
            /** @description Optional full preceding-year net estimate if source history is incomplete. Compared separately without changing imported totals, reporting eligibility, or coverage. */
            previous_year_assumption?: {
                /** @description Currency of the retained preceding-year threshold for the declared sole establishment. */
                currency: string;
                /** @example 10000.01 */
                net_amount: string;
            };
            previous_year_complete: boolean;
            /** @default 0 */
            revision: number;
            sole_establishment: boolean;
            /**
             * @description Set to false if coverage_through is only a reference date.
             * @default true
             */
            source_coverage_declared: boolean;
        };
        CustomerOSSContextSaveResponse: {
            /** @enum {boolean} */
            customer_declared: true;
            /** @enum {boolean} */
            saved: true;
        };
        CustomerOSSCoverageSource: {
            /** Format: date */
            applicable_from: string;
            /** Format: date */
            automatic_since?: string;
            /** Format: int64 */
            connection_id?: bigint;
            /** @enum {string} */
            coverage_evidence?: "legacy_account_declaration" | "source_declaration" | "shopify_reconciliation";
            /** Format: date */
            covered_through?: string;
            key: string;
            label: string;
            /** @enum {string} */
            method: "manual" | "automatic";
            /** Format: date-time */
            observed_at?: string;
            reason?: string;
            /** Format: date */
            required_through: string;
            revision: number;
            /** @enum {string} */
            status: "confirmation_required" | "connection_required" | "reconciliation_required" | "covered";
        };
        /** @description Customer declarations applicable to the report year. Null when the customer has no applicable declaration. */
        CustomerOSSDeclarations: {
            coverage_through: string | "";
            /** Format: date */
            destination_taxation_option_from?: string;
            establishment_country: string;
            previous_year_assumption?: components["schemas"]["CustomerPreviousYearAssumption"];
            previous_year_complete: boolean | null;
            revision: number;
            sole_establishment: boolean | null;
            source_coverage_declared?: boolean;
        } | null;
        CustomerOSSDistanceSaleFacts: {
            assembly_or_installation: components["schemas"]["CustomerOSSApplicabilityFact"];
            new_means_of_transport: components["schemas"]["CustomerOSSApplicabilityFact"];
        };
        CustomerOSSEvidenceReference: {
            digest: string;
            id: string;
        };
        CustomerOSSFilingAccountEvidence: {
            /** Format: date */
            coverage_through?: string;
            /** Format: date */
            destination_election_from?: string;
            establishment_country: string;
            previous_year_complete?: boolean;
            revision: number;
            sole_establishment: boolean | null;
        };
        CustomerOSSFilingBlocker: {
            destination: string;
            distance_sale_facts?: components["schemas"]["CustomerOSSDistanceSaleFacts"];
            event_id: string;
            /** @enum {string} */
            filing_disposition: "needs_review" | "excluded";
            order: string;
            reasons: components["schemas"]["CustomerOSSIssue"][];
            /** @enum {string} */
            reconciliation_state: "legacy_unreconciled" | "matched" | "expected_no_checkout_vat" | "mismatch" | "incomplete_evidence" | "unsupported" | "excluded";
        };
        CustomerOSSFilingCalculationEvidence: {
            history_id: string;
            input_digest: string;
            legal_applicability: string;
            option_id: string;
            /** Format: int64 */
            rate_bps: bigint;
            /** Format: date */
            requested_from: string;
            /** Format: date */
            requested_to: string;
            rule_id?: string;
            rule_revision?: number;
            snapshot_digest: string;
            snapshot_id: string;
            /** Format: date */
            source_reported_on: string;
            source_row_digest: string;
            source_row_id: string;
            source_row_ordinal: number;
        };
        CustomerOSSFilingClassificationEvidence: {
            decision: components["schemas"]["CustomerOSSEvidenceReference"];
            tax_class: string;
        };
        CustomerOSSFilingDecisionEvidence: {
            dependency_snapshot?: components["schemas"]["CustomerOSSEvidenceReference"];
            expected_treatment?: components["schemas"]["CustomerOSSEvidenceReference"];
            reconciliation?: components["schemas"]["CustomerOSSEvidenceReference"];
        };
        CustomerOSSFilingEvidence: {
            account_declaration?: components["schemas"]["CustomerOSSFilingAccountEvidence"];
            calculation?: components["schemas"]["CustomerOSSFilingCalculationEvidence"];
            /** @enum {string} */
            calculation_reference_status: "unavailable" | "source_revision_unverified" | "observation_unverified" | "retained";
            catalog_classification?: components["schemas"]["CustomerVATCatalogClassification"];
            distance_sale_facts?: components["schemas"]["CustomerOSSDistanceSaleFacts"];
            event_id: string;
            filing_classification?: components["schemas"]["CustomerOSSFilingClassificationEvidence"];
            formal_decision: components["schemas"]["CustomerOSSFilingDecisionEvidence"];
            installation_declaration?: components["schemas"]["CustomerOSSInstallationSourceProfile"];
            order: string;
            original_event_id?: string;
            product?: string;
            registration?: components["schemas"]["CustomerOSSFilingRegistrationEvidence"];
            /** @enum {string} */
            source_amounts: "unavailable" | "matches" | "differs";
            source_revision?: components["schemas"]["CustomerOSSEvidenceReference"];
            /** Format: date */
            supply_date: string;
            variant?: string;
        };
        CustomerOSSFilingRegistrationEvidence: {
            /** Format: date */
            covered_through?: string;
            /** Format: date */
            effective_from: string;
            member_state: string;
            /** Format: int64 */
            registration_id: bigint;
            revision: components["schemas"]["CustomerOSSEvidenceReference"];
        };
        CustomerOSSFilingReview: {
            blocked_events: components["schemas"]["CustomerOSSFilingBlocker"][];
            evidence?: components["schemas"]["CustomerOSSFilingEvidence"][];
            ready_event_count: number;
        };
        CustomerOSSFormalAuthorityReadiness: {
            reasons?: string[];
            /** @enum {string} */
            status: "ready" | "blocked" | "unavailable";
        };
        CustomerOSSInstallationSourceProfile: {
            /** Format: date */
            effective_from: string;
            /** Format: int64 */
            id: bigint;
            reference: components["schemas"]["CustomerOSSEvidenceReference"];
            revision: number;
        };
        CustomerOSSIssue: {
            action: string;
            /** @enum {string} */
            category?: "preparation_notice" | "included_event_warning" | "domestic_reconciliation_warning" | "other_reconciliation_warning";
            code: string;
            event_id?: string;
        };
        CustomerOSSPreparation: {
            blocker_count: number;
            events: components["schemas"]["CustomerOSSPreparationEvent"][];
            formal_authority_readiness: components["schemas"]["CustomerOSSFormalAuthorityReadiness"];
            preparation_readiness: components["schemas"]["CustomerOSSPreparationReadiness"];
        };
        CustomerOSSPreparationAmounts: {
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            gross_amount_minor?: string;
            net_amount_minor: string;
            vat_amount_minor?: string;
        };
        CustomerOSSPreparationEvent: {
            calculated_amounts?: components["schemas"]["CustomerOSSPreparationAmounts"];
            destination: string;
            event_id: string;
            formal_authority_readiness: components["schemas"]["CustomerOSSFormalAuthorityReadiness"];
            order: string;
            oss_applicability: components["schemas"]["CustomerUnionOSSOutcome"];
            preparation_readiness: components["schemas"]["CustomerOSSPreparationReadiness"];
            /** @enum {string} */
            rate_provenance?: "conditional_tedb";
            /** Format: int64 */
            registration_id?: bigint;
            source_amounts?: components["schemas"]["CustomerOSSPreparationAmounts"];
            source_provenance?: string;
        };
        CustomerOSSPreparationReadiness: {
            reasons?: string[];
            /** @enum {string} */
            status: "ready" | "blocked" | "not_applicable" | "unavailable";
        };
        /** @description Informational operational Union OSS preview. Operational estimates show native-currency calculations, while the summary uses the return currency. */
        CustomerOSSReport: {
            article_59c: components["schemas"]["CustomerArticle59c"];
            /** Format: date */
            as_of: string;
            /** @enum {string} */
            coverage_status: "incomplete" | "complete_customer_data";
            customer_declarations: components["schemas"]["CustomerOSSDeclarations"];
            customer_declarations_revision: number;
            disclaimer: string;
            /** @enum {boolean} */
            filing_ready: false;
            /** @enum {boolean} */
            informational_only: true;
            issues: components["schemas"]["CustomerOSSIssue"][];
            observed_imported_amounts?: components["schemas"]["CustomerObservedImported"][];
            operational_estimate?: components["schemas"]["CustomerOperationalEstimate"];
            oss_preparation?: components["schemas"]["CustomerOSSPreparation"];
            period: string;
            period_open: boolean;
            provisional_amounts: components["schemas"]["CustomerProvisionalAmount"][];
            provisional_event_count: number;
            qualifying_countries: string[];
            quarters?: components["schemas"]["CustomerArticle59cQuarter"][];
            recent_qualifying_activity: components["schemas"]["CustomerOSSActivity"][];
            /** @enum {string} */
            registration_status: "active" | "required" | "ambiguous" | "details_incomplete";
            /** @enum {string} */
            report_mode: "operational" | "registration_independent_preview";
            /** @enum {string} */
            return_status: "not_locked" | "locked" | "filed";
            /** @enum {string} */
            schema_version: "customer-operational-oss/v1";
            /** @enum {boolean} */
            simulated?: true;
            source_coverage?: components["schemas"]["CustomerOSSSourceCoverage"];
            /** @enum {boolean} */
            submitted: false;
            summary: components["schemas"]["CustomerUnionOSSSummary"];
            union_oss_filing_review?: components["schemas"]["CustomerOSSFilingReview"];
            union_oss_supply_outcomes?: components["schemas"]["CustomerOSSScopeCount"][];
        };
        CustomerOSSScopeCount: {
            event_count: number;
            reason: string;
            /** @enum {string} */
            status: "included" | "excluded" | "unresolved" | "candidate";
        };
        CustomerOSSSourceCoverage: {
            /** Format: date */
            covered_through?: string;
            current_complete: boolean;
            previous_year_complete: boolean;
            /** Format: date */
            requested_through: string;
            sources: components["schemas"]["CustomerOSSCoverageSource"][];
        };
        CustomerPreviousYearAssumption: {
            currency: string;
            net_amount: string;
        };
        CustomerPreviousYearScenario: {
            /** @enum {string} */
            comparison: "at_or_below" | "above";
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            net_amount_minor: string;
        };
        CustomerProvisionalAmount: {
            country: string;
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            net_amount_minor: string;
            rate_bps: number;
            source_event_count: number;
            vat_amount_minor: string;
        };
        CustomerUnionOSSOutcome: {
            reason: string;
            /** @enum {string} */
            status: "included" | "excluded" | "unresolved" | "candidate";
        };
        /** @description Preview totals in return_currency. Null when the evidence needed to produce the preview is unavailable. */
        CustomerUnionOSSSummary: {
            balances?: components["schemas"]["CustomerUnionOSSSummaryBalance"][];
            corrections?: components["schemas"]["CustomerUnionOSSSummaryCorrection"][];
            excluded_source_event_count: number;
            included_source_event_count: number;
            member_state_identification: string;
            /** Format: date */
            period_end: string;
            period_key: string;
            /** Format: date */
            period_start: string;
            return_currency: string;
            rows: components["schemas"]["CustomerUnionOSSSummaryRow"][];
            /** @enum {string} */
            scheme_type: "union_oss";
            total_source_event_count: number;
            totals: components["schemas"]["CustomerUnionOSSSummaryTotals"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        } | null;
        CustomerUnionOSSSummaryBalance: {
            correction_vat_amount_minor: string;
            current_vat_amount_minor: string;
            included_in_payable_total: boolean;
            member_state_consumption: string;
            vat_amount_minor: string;
        };
        CustomerUnionOSSSummaryCorrection: {
            member_state_consumption: string;
            original_period_key: string;
            source_event_count: number;
            vat_correction_amount_minor: string;
        };
        CustomerUnionOSSSummaryRow: {
            dispatch_country?: string;
            fixed_establishment_country?: string;
            member_state_consumption: string;
            /** @enum {string} */
            return_rate_category: "standard" | "reduced";
            /** @enum {string} */
            return_section: "2a" | "2b" | "2c" | "2d";
            source_event_count: number;
            /** @enum {string} */
            supply_kind: "goods" | "services";
            taxable_amount_minor: string;
            vat_amount_minor: string;
            vat_rate_bps: number;
        };
        CustomerUnionOSSSummaryTotals: {
            correction_vat_amount_minor: string;
            current_vat_amount_minor: string;
            taxable_amount_minor: string;
            vat_amount_minor: string;
        };
        CustomerVATAttentionResponse: {
            has_more: boolean;
            pending_count: number;
        };
        /** @description Conditional amounts in minor units at currency_scale. Corrections can be signed. No filing authority is conferred. */
        CustomerVATCalculation: {
            assumptions: string[];
            calculator_version: string;
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            declared_attributes: {
                [key: string]: string;
            };
            gross_amount_minor: string;
            net_amount_minor: string;
            option_id: string;
            /** @enum {string} */
            persistence: "customer_operational_projection";
            /** Format: int64 */
            rate_bps: bigint;
            vat_amount_minor: string;
        };
        CustomerVATCatalogClassification: {
            catalog_digest: string;
            catalog_version: string;
            code: string;
            /** Format: date */
            date: string;
            node_digest: string;
            provenance: string;
            /** @enum {string} */
            scheme: "cn" | "cpa";
        };
        CustomerVATClassificationCandidate: {
            catalog_version: string;
            code: string;
            description: string;
            /** @enum {string} */
            scheme: "cn" | "cpa";
        };
        CustomerVATClassificationRequest: {
            catalog_version?: string;
            /** @description Full eight-digit CN or six-digit CPA item code. */
            code: string;
            /** Format: uuid */
            event_id: string;
            /** @enum {string} */
            scheme: "cn" | "cpa";
        };
        CustomerVATDeclaredFacts: {
            /** @enum {string} */
            customer_type?: "b2b" | "b2c";
            destination_country?: string;
            revision: number;
        };
        CustomerVATDeclaredGoods: {
            excise_goods?: boolean;
            is_assembly_or_installation?: boolean;
            is_new_means_of_transport?: boolean;
        };
        /** @description Displayable source amounts appear as exact minor-unit strings when available. */
        CustomerVATDisplay: {
            /** Format: int32 */
            currency_scale: number;
            gross_amount_minor?: string;
            net_amount_minor?: string;
            order_name?: string;
            product_title?: string;
            /** Format: date */
            store_default_from?: string;
            vat_amount_minor?: string;
        };
        CustomerVATEngineTreatment: {
            original_sale_event_id?: string;
            /** @enum {boolean} */
            provisional?: true;
            /** Format: int64 */
            rate_bps: bigint;
            source_option_id?: string;
            source_row_digest?: string;
            source_snapshot_id?: string;
            source_value_type?: string;
        };
        /** @description Source event used for the evaluation. Event amounts ending in _minor are JSON int64 values in the corresponding currency scale. */
        CustomerVATEvent: {
            authenticated_shopify_payment?: components["schemas"]["CustomerVATHistoricalShopifyPayment"];
            /** Format: date-time */
            authenticated_source_time?: string;
            consignment_currency?: string;
            /** Format: int32 */
            consignment_currency_scale?: number;
            /**
             * Format: int64
             * @description JSON integer with int64 precision. For exact arithmetic above the JavaScript safe-integer range, use a lossless JSON parser.
             */
            consignment_intrinsic_value_minor?: bigint;
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            /** @enum {string} */
            customer_type: "b2b" | "b2c" | "unknown";
            declared_facts?: components["schemas"]["CustomerVATDeclaredFacts"];
            declared_goods?: components["schemas"]["CustomerVATDeclaredGoods"];
            /** Format: date-time */
            declared_payment_accepted_at?: string;
            /** Format: date-time */
            declared_supply_occurred_at?: string;
            dispatch_country: string | null;
            /** @enum {string} */
            event_type: "sale" | "refund" | "cancellation" | "credit_note" | "adjustment";
            excise_goods: boolean;
            external_line_id: string;
            external_order_id: string;
            fixed_establishment_country: string | null;
            /**
             * Format: int64
             * @description JSON integer with int64 precision. For exact arithmetic above the JavaScript safe-integer range, use a lossless JSON parser.
             */
            gross_amount_minor: bigint;
            id: string;
            import_origin_country: string | null;
            /** Format: int64 */
            integration_id: bigint;
            is_assembly_or_installation: boolean;
            is_new_means_of_transport: boolean;
            marketplace_deemed_supplier: boolean;
            member_state_consumption: string;
            original_supply_event_id: string | null;
            price_includes_vat: boolean | null;
            source_digest: string;
            /** Format: int64 */
            source_profile_id: bigint;
            source_provenance: string;
            source_record_id: string;
            supplier_establishment_country: string | null;
            /** Format: date */
            supply_date: string;
            /** @enum {string} */
            supply_kind: "goods" | "service" | "tbe_service" | "imported_goods";
            /**
             * Format: int64
             * @description JSON integer with int64 precision. For exact arithmetic above the JavaScript safe-integer range, use a lossless JSON parser.
             */
            taxable_amount_minor: bigint;
        };
        CustomerVATEventRequest: {
            /** Format: uuid */
            event_id: string;
        };
        /**
         * @example {
         *       "events": [],
         *       "informational_only": true,
         *       "filing_ready": false
         *     }
         */
        CustomerVATEventsResponse: {
            events: components["schemas"]["CustomerVATResult"][];
            /** @enum {boolean} */
            filing_ready: false;
            /** @description Included when country or period is used. A filter that was not applied is an empty string. */
            filters?: {
                country: string;
                period: string;
            };
            /** @enum {boolean} */
            informational_only: true;
            /** @description Opaque cursor. Omitted on the last page. */
            next_cursor?: string;
        };
        /** @description Classification provenance retained on historical Shopify events. */
        CustomerVATHistoricalShopifyClassification: {
            evidence: string;
            jurisdiction?: string;
        };
        /** @description Payment provenance retained on historical Shopify events. */
        CustomerVATHistoricalShopifyPayment: {
            /** Format: date-time */
            accepted_at?: string;
            issue?: string;
            order_id: string;
            parent_transaction_id?: string;
            provider: string;
            transaction_count: number;
            transaction_id?: string;
            transaction_kind?: string;
            transaction_status?: string;
        };
        /** @description Source-information envelope. An unresolved or queued event can contain a zero-value envelope with empty strings and null lists. A customer provisional rate is a declaration without retained source evidence. */
        CustomerVATInformation: {
            classification: components["schemas"]["CustomerVATInformationClassification"];
            disclaimer: string;
            filing_ready: boolean;
            informational_only: boolean;
            /** @enum {string} */
            legal_applicability: "" | "not_established";
            options: components["schemas"]["CustomerVATInformationOption"][] | null;
            query: components["schemas"]["CustomerVATInformationQuery"];
            /** @enum {string} */
            schema_version: "" | "vat-information/v1";
            source: components["schemas"]["CustomerVATInformationSource"];
            source_assumptions: string[] | null;
            /** @enum {string} */
            status: "" | "resolved" | "conditional" | "multiple_options" | "unavailable" | "customer_provisional_rate";
            warnings: string[] | null;
        };
        CustomerVATInformationClassification: {
            description: string;
            display_code: string;
            node_digest: string;
            root_digest: string;
            source_digest: string;
            source_reference: string;
            /** Format: date */
            valid_from: string;
            /** Format: date */
            valid_to: string | null;
            version: string;
        } | null;
        CustomerVATInformationOption: {
            category: string;
            conditions: string;
            /** @enum {string} */
            conditions_state: "" | "not_reported" | "empty_reported" | "text_reported";
            /** @enum {string} */
            match_kind: "" | "exact" | "catalog_ancestor";
            matched_code: string;
            option_id: string;
            /** Format: int64 */
            rate_bps: bigint | null;
            source_ordinal: number;
            /** Format: date */
            source_reported_date: string | null;
            source_row_digest: string;
            /** @enum {string} */
            value_type: "DEFAULT" | "REDUCED_RATE" | "SUPER_REDUCED_RATE" | "PARKING_RATE" | "EXEMPTED" | "OUT_OF_SCOPE" | "NOT_APPLICABLE" | "CUSTOMER_CONFIGURED";
        };
        CustomerVATInformationQuery: {
            catalog_version?: string;
            code: string;
            country: string;
            date: string | "";
            /** @enum {string} */
            scheme: "" | "cn" | "cpa";
            snapshot_id?: string;
        };
        CustomerVATInformationSource: {
            canonical_sha256: string;
            parser_version: string;
            raw_sha256: string;
            reference: string;
            /** Format: date */
            requested_from: string;
            /** Format: date */
            requested_to: string;
            /** Format: date-time */
            retrieved_at: string;
            snapshot_id: string;
        } | null;
        CustomerVATOperationalReview: {
            /** @enum {string} */
            calculation_status: "queued" | "review" | "calculated" | "locked" | "no_charge";
            classification?: components["schemas"]["CustomerVATCatalogClassification"];
            currency: string;
            /** Format: int32 */
            currency_scale: number;
            declared_facts?: components["schemas"]["CustomerVATDeclaredFacts"];
            estimate?: components["schemas"]["CustomerVATReviewAmounts"];
            imported: components["schemas"]["CustomerVATReviewAmounts"];
            imported_vat_differs: boolean;
            /** @enum {boolean} */
            provisional?: true;
            /** @enum {string} */
            source_amount_status: "unavailable" | "matches" | "differs";
            vat_delta_minor?: string;
            vat_engine_treatment?: components["schemas"]["CustomerVATEngineTreatment"];
        };
        /** @description Current operational VAT evaluation. Queued or review results may have no calculation or retained classification. The state describes processing, and issue is empty when no review issue applies. */
        CustomerVATResult: {
            calculation?: components["schemas"]["CustomerVATCalculation"];
            catalog_classification?: components["schemas"]["CustomerVATCatalogClassification"];
            classification_candidates?: components["schemas"]["CustomerVATClassificationCandidate"][];
            display: components["schemas"]["CustomerVATDisplay"];
            event: components["schemas"]["CustomerVATEvent"];
            /** @enum {boolean} */
            filing_ready: false;
            information: components["schemas"]["CustomerVATInformation"];
            /** @enum {boolean} */
            informational_only: true;
            input_digest: string;
            /** @description Operational issue code, or an empty string. */
            issue: string;
            operational_review?: components["schemas"]["CustomerVATOperationalReview"];
            original_calculation_digest?: string;
            original_review_event_id?: string;
            /** @enum {boolean} */
            provisional?: true;
            provisional_product_revision?: number;
            rule_id?: string;
            rule_revision?: number;
            scope: components["schemas"]["CustomerVATScope"];
            shopify_classification?: components["schemas"]["CustomerVATHistoricalShopifyClassification"];
            source_alternatives?: components["schemas"]["CustomerVATInformation"];
            source_rule_revision?: number;
            /** @enum {string} */
            state: "queued" | "review" | "calculated" | "locked" | "no_charge";
            /** @enum {boolean} */
            store_default?: true;
        };
        CustomerVATRetireRequest: {
            expected_revision: number;
            /** Format: uuid */
            rule_id: string;
        };
        CustomerVATRetireResponse: {
            /** @enum {boolean} */
            retired: true;
        };
        CustomerVATReviewAmounts: {
            gross_amount_minor: string;
            net_amount_minor: string;
            /** Format: int64 */
            rate_bps: bigint;
            vat_amount_minor: string;
        };
        CustomerVATRule: {
            /** @enum {string} */
            action: "selected" | "retired";
            alternatives_meaning: string;
            declarations: {
                [key: string]: string;
            };
            /** Format: date */
            effective_from: string;
            /** Format: date */
            effective_to: string | null;
            id: string;
            information: components["schemas"]["CustomerVATInformation"];
            option_id: string;
            option_meaning: string;
            revision: number;
            scope: components["schemas"]["CustomerVATScope"];
        };
        /**
         * @example {
         *       "rules": []
         *     }
         */
        CustomerVATRulesResponse: {
            rules: components["schemas"]["CustomerVATRule"][];
        };
        /** @description Scope of the operational evaluation or saved rule. Unknown or inapplicable scope fields can be empty strings or zero identifiers. */
        CustomerVATScope: {
            assembly: boolean;
            catalog_version: string;
            code: string;
            country: string;
            /** @enum {string} */
            customer_type: "" | "b2b" | "b2c" | "unknown";
            /** @description Empty when no dispatch country is recorded. */
            dispatch_country: string;
            excise: boolean;
            fixed_country: string;
            import_origin: string;
            /** Format: int64 */
            integration_id: bigint;
            /** @enum {string} */
            kind?: "store_default";
            marketplace: boolean;
            new_means_of_transport: boolean;
            product: string;
            /** @enum {string} */
            scheme: "" | "cn" | "cpa";
            /** Format: int64 */
            source_profile_id: bigint;
            supplier_country: string;
            /** @enum {string} */
            supply_kind: "" | "goods" | "service" | "tbe_service" | "imported_goods";
            transaction_id?: string;
            variant: string;
        };
        CustomerVATSelectionRequest: {
            /** @description Customer declarations, never verified product or transaction facts. */
            circumstances: {
                [key: string]: string;
            };
            /** @enum {boolean} */
            confirmed_conditions: true;
            /** Format: date */
            effective_to?: string;
            /** Format: uuid */
            event_id: string;
            /** @default 0 */
            expected_revision: number;
            option_id: string;
        };
        ErrorResponse: {
            /**
             * @description Human-readable error description
             * @example unexpected end of JSON input
             */
            detail: string;
            /**
             * @description Error code
             * @example invalid_json
             */
            error: string;
        };
        InformationalVATCalculation: {
            assumptions: string[];
            calculator_version: string;
            currency: string;
            currency_scale: number;
            declared_attributes: {
                [key: string]: string;
            };
            gross_amount_minor: string;
            net_amount_minor: string;
            option_id: string;
            /** @enum {string} */
            persistence: "not_persisted";
            rate_bps: number;
            vat_amount_minor: string;
        };
        InformationalVATCalculationRequest: {
            /** Format: int64 */
            amount_minor: bigint;
            /** @description Supported ISO 4217 currency with defined minor units. */
            currency: string;
            /** @description Customer declarations only; never verified facts or automatic condition clearance. */
            declared_attributes?: {
                [key: string]: string;
            };
            option_id: string;
            price_includes_vat: boolean;
            query: components["schemas"]["InformationalVATQuery"];
        };
        InformationalVATQuery: {
            catalog_version?: string;
            code: string;
            country: string;
            /** Format: date */
            date: string;
            /** @enum {string} */
            scheme: "cn" | "cpa";
            snapshot_id?: string;
        };
        InformationalVATResult: {
            classification: {
                description?: string;
                display_code?: string;
                node_digest?: string;
                root_digest?: string;
                source_digest?: string;
                /** Format: uri */
                source_reference?: string;
                /** Format: date */
                valid_from?: string;
                /** Format: date */
                valid_to?: string | null;
                version?: string;
            } | null;
            disclaimer: string;
            /** @enum {boolean} */
            filing_ready: false;
            /** @enum {boolean} */
            informational_only: true;
            /** @enum {string} */
            legal_applicability: "not_established";
            options: {
                category: string;
                conditions: string;
                /**
                 * @description Native field absence differs from an explicitly empty field.
                 * @enum {string}
                 */
                conditions_state: "not_reported" | "empty_reported" | "text_reported";
                /** @enum {string} */
                match_kind: "exact" | "catalog_ancestor";
                matched_code: string;
                option_id: string;
                /** Format: int64 */
                rate_bps: bigint | null;
                source_ordinal: number;
                /** Format: date */
                source_reported_date: string | null;
                source_row_digest: string;
                /** @enum {string} */
                value_type: "DEFAULT" | "REDUCED_RATE" | "SUPER_REDUCED_RATE" | "PARKING_RATE" | "EXEMPTED" | "OUT_OF_SCOPE" | "NOT_APPLICABLE";
            }[];
            query: components["schemas"]["InformationalVATQuery"];
            /** @enum {string} */
            schema_version: "vat-information/v1";
            source: {
                canonical_sha256?: string;
                parser_version?: string;
                raw_sha256?: string;
                /** Format: uri */
                reference?: string;
                /** Format: date */
                requested_from?: string;
                /** Format: date */
                requested_to?: string;
                /** Format: date-time */
                retrieved_at?: string;
                snapshot_id?: string;
            } | null;
            /** @description Explicit informational scope; never a proven legal interval or product qualification. */
            source_assumptions: string[];
            /**
             * @description Informational namespace only. Resolved requires verified complete evidence, one exact code and descriptive-scope match, explicit empty conditions, a unique catalog and covered source date. It never establishes legal or filing authority.
             * @enum {string}
             */
            status: "resolved" | "conditional" | "multiple_options" | "unavailable";
            warnings: string[];
        };
        OSSAccountantReportFilingContext: {
            /**
             * Format: date
             * @example 2026-04-30
             */
            filing_due_date: string;
            /**
             * @description True only when zero source events were recorded for the selected quarter.
             * @example false
             */
            nil_return_eligible: boolean;
            /**
             * @example reportable_lines_present
             * @enum {string}
             */
            status: "reportable_lines_present" | "nil_return_candidate" | "review_required";
            /** @example This quarter has included Union OSS lines ready for accountant review. */
            status_detail: string;
        };
        OSSAccountantReportResponse: {
            country_breakdown: components["schemas"]["OSSCountryVATBreakdownExportBreakdown"];
            filing_context: components["schemas"]["OSSAccountantReportFilingContext"];
            manifest: components["schemas"]["OSSReportExportManifest"];
            summary: components["schemas"]["OSSQuarterlySummaryExportSummary"];
        };
        OSSCountryVATBreakdownCountry: {
            /**
             * Format: int64
             * @example -500
             */
            correction_vat_amount_minor: bigint;
            corrections?: components["schemas"]["OSSQuarterlySummaryCorrection"][];
            /**
             * Format: int64
             * @example 28500
             */
            current_vat_amount_minor: bigint;
            /** @example true */
            included_in_payable_total: boolean;
            /** @example FR */
            member_state_consumption: string;
            rows: components["schemas"]["OSSQuarterlySummaryRow"][];
            /** @example 12 */
            source_event_count: number;
            /**
             * Format: int64
             * @example 150000
             */
            taxable_amount_minor: bigint;
            /**
             * Format: int64
             * @example 28000
             */
            vat_amount_minor: bigint;
        };
        OSSCountryVATBreakdownExportBreakdown: {
            countries: components["schemas"]["OSSCountryVATBreakdownExportCountry"][];
            /** @example 2 */
            excluded_source_event_count: number;
            /** @example 118 */
            included_source_event_count: number;
            /** @example DE */
            member_state_identification: string;
            /**
             * Format: date
             * @example 2026-03-31
             */
            period_end: string;
            /** @example 2026-Q1 */
            period_key: string;
            /**
             * Format: date
             * @example 2026-01-01
             */
            period_start: string;
            /** @example EUR */
            return_currency: string;
            /**
             * @example union_oss
             * @enum {string}
             */
            scheme_type: "union_oss";
            /** @example 120 */
            total_source_event_count: number;
            totals: components["schemas"]["OSSReportExportTotals"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSCountryVATBreakdownExportCountry: {
            /**
             * @description Major-unit decimal string in the return currency.
             * @example -5.00
             */
            correction_vat_amount: string;
            corrections?: components["schemas"]["OSSQuarterlySummaryExportCorrection"][];
            /**
             * @description Major-unit decimal string in the return currency.
             * @example 285.00
             */
            current_vat_amount: string;
            /** @example true */
            included_in_payable_total: boolean;
            /** @example FR */
            member_state_consumption: string;
            rows: components["schemas"]["OSSQuarterlySummaryExportRow"][];
            /** @example 12 */
            source_event_count: number;
            /**
             * @description Major-unit decimal string in the return currency.
             * @example 1500.00
             */
            taxable_amount: string;
            /**
             * @description Major-unit payable VAT balance in the return currency.
             * @example 280.00
             */
            vat_amount: string;
        };
        OSSCountryVATBreakdownExportResponse: {
            breakdown: components["schemas"]["OSSCountryVATBreakdownExportBreakdown"];
            manifest: components["schemas"]["OSSReportExportManifest"];
        };
        OSSCountryVATBreakdownResponse: {
            countries: components["schemas"]["OSSCountryVATBreakdownCountry"][];
            /** @example 2 */
            excluded_source_event_count: number;
            /** @example 118 */
            included_source_event_count: number;
            /** @example DE */
            member_state_identification: string;
            /**
             * Format: date
             * @example 2026-03-31
             */
            period_end: string;
            /** @example 2026-Q1 */
            period_key: string;
            /**
             * Format: date
             * @example 2026-01-01
             */
            period_start: string;
            /** @example EUR */
            return_currency: string;
            /**
             * @example union_oss
             * @enum {string}
             */
            scheme_type: "union_oss";
            /** @example 120 */
            total_source_event_count: number;
            totals: components["schemas"]["OSSQuarterlySummaryTotals"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSFilingPrepIOSS: {
            /** @example DE */
            member_state_identification?: string | null;
            months: components["schemas"]["OSSFilingPrepIOSSMonth"][];
            /**
             * @example month
             * @enum {string}
             */
            period_kind: "month";
            /** @example EUR */
            return_currency?: string | null;
            /**
             * @example ioss
             * @enum {string}
             */
            scheme_type: "ioss";
            source_event_counts: components["schemas"]["OSSMultiJurisdictionSourceEventCounts"];
            /**
             * @example reportable_lines_present
             * @enum {string}
             */
            status: "reportable_lines_present" | "nil_return_candidate" | "review_required" | "registration_required" | "registration_ambiguous" | "registration_details_incomplete" | "missing_exchange_rate" | "summary_event_cap_exceeded";
            /** @example 1 month in this quarter has included IOSS lines ready for accountant review. */
            status_detail: string;
            totals?: components["schemas"]["OSSQuarterlySummaryTotals"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSFilingPrepIOSSMonth: {
            /**
             * Format: date
             * @example 2026-02-28
             */
            filing_due_date: string;
            /** @example 2 */
            jurisdiction_count?: number;
            /** @example DE */
            member_state_identification?: string | null;
            /**
             * Format: date
             * @example 2026-01-31
             */
            period_end: string;
            /** @example 2026-01 */
            period_key: string;
            /**
             * Format: date
             * @example 2026-01-01
             */
            period_start: string;
            /** @example EUR */
            return_currency?: string | null;
            source_event_counts: components["schemas"]["OSSMultiJurisdictionSourceEventCounts"];
            /**
             * @example reportable_lines_present
             * @enum {string}
             */
            status: "reportable_lines_present" | "nil_return_candidate" | "review_required" | "registration_required" | "registration_ambiguous" | "registration_details_incomplete" | "missing_exchange_rate" | "summary_event_cap_exceeded";
            /** @example This month has included IOSS lines ready for accountant review. */
            status_detail: string;
            totals?: components["schemas"]["OSSQuarterlySummaryTotals"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSFilingPrepRegistrationsSummary: {
            /**
             * @description Active registration records that are currently in force on the account.
             * @example 2
             */
            active_count: number;
            /** @description Records overlapping the period that still need customer-declared identifiers. */
            details_incomplete_count?: number;
            /** @example true */
            ioss_covering_period: boolean;
            /**
             * @description Registration records that are not yet in force, including future-effective rows.
             * @example 1
             */
            pending_count: number;
            /** @example false */
            union_oss_ambiguous: boolean;
            /** @example true */
            union_oss_covering_period: boolean;
        };
        OSSFilingPrepResponse: {
            /**
             * Format: date
             * @example 2026-04-30
             */
            filing_due_date: string;
            /**
             * Format: date-time
             * @example 2026-05-16 10:15:30+00:00
             */
            generated_at: string;
            ioss: components["schemas"]["OSSFilingPrepIOSS"];
            /**
             * @example [
             *       "Union and non-Union OSS return periods are calendar quarters; the import scheme return period is a calendar month."
             *     ]
             */
            official_basis: string[];
            /**
             * Format: date
             * @example 2026-03-31
             */
            period_end: string;
            /** @example 2026-Q1 */
            period_key: string;
            /**
             * Format: date
             * @example 2026-01-01
             */
            period_start: string;
            registrations: components["schemas"]["OSSFilingPrepRegistrationsSummary"];
            /** @example oss_ioss_filing_prep_workspace */
            report_kind: string;
            union_oss: components["schemas"]["OSSFilingPrepUnion"];
        };
        OSSFilingPrepUnion: {
            /**
             * Format: date
             * @example 2026-04-30
             */
            filing_due_date: string;
            /** @example 4 */
            jurisdiction_count?: number;
            /** @example DE */
            member_state_identification?: string | null;
            /** @example false */
            nil_return_eligible: boolean;
            /**
             * @example quarter
             * @enum {string}
             */
            period_kind: "quarter";
            /** @example true */
            preview_available: boolean;
            /** @example EUR */
            return_currency?: string | null;
            /**
             * @example union_oss
             * @enum {string}
             */
            scheme_type: "union_oss";
            source_event_counts?: components["schemas"]["OSSMultiJurisdictionSourceEventCounts"];
            /**
             * @example reportable_lines_present
             * @enum {string}
             */
            status: "reportable_lines_present" | "nil_return_candidate" | "review_required" | "registration_required" | "registration_ambiguous" | "registration_details_incomplete" | "missing_exchange_rate" | "summary_event_cap_exceeded";
            /** @example This quarter has included Union OSS lines ready for accountant review. */
            status_detail: string;
            totals?: components["schemas"]["OSSQuarterlySummaryTotals"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSMultiJurisdictionExposure: {
            /** @example FR */
            member_state_consumption: string;
            /** @example 2 */
            report_line_count: number;
            /**
             * @example [
             *       "2b",
             *       "2d"
             *     ]
             */
            return_sections: ("2a" | "2b" | "2c" | "2d")[];
            /**
             * @example [
             *       "union_oss"
             *     ]
             */
            scheme_types: "union_oss"[];
            /** @example 8 */
            source_event_count: number;
            /**
             * Format: int64
             * @example 10000
             */
            taxable_amount_minor: bigint;
            /**
             * Format: int64
             * @example 2000
             */
            vat_amount_minor: bigint;
        };
        OSSMultiJurisdictionIOSS: {
            /** @example DE */
            member_state_identification?: string | null;
            months: components["schemas"]["OSSMultiJurisdictionIOSSMonth"][];
            /**
             * @example month
             * @enum {string}
             */
            period_kind: "month";
            /** @example EUR */
            return_currency?: string | null;
            /**
             * @example ioss
             * @enum {string}
             */
            scheme_type: "ioss";
            source_event_counts: components["schemas"]["OSSMultiJurisdictionSourceEventCounts"];
            /**
             * @example review_required
             * @enum {string}
             */
            status: "reportable_lines_present" | "nil_return_candidate" | "review_required" | "registration_required" | "registration_ambiguous" | "registration_details_incomplete" | "missing_exchange_rate" | "summary_event_cap_exceeded";
            /** @example 1 month in this quarter still needs review before it can be treated as ready or nil IOSS output. */
            status_detail: string;
            totals?: components["schemas"]["OSSQuarterlySummaryTotals"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSMultiJurisdictionIOSSMonth: {
            /**
             * Format: date
             * @example 2026-02-28
             */
            filing_due_date: string;
            /** @example 2 */
            jurisdiction_count?: number;
            /** @example DE */
            member_state_identification?: string | null;
            /**
             * Format: date
             * @example 2026-01-31
             */
            period_end: string;
            /** @example 2026-01 */
            period_key: string;
            /**
             * Format: date
             * @example 2026-01-01
             */
            period_start: string;
            /** @example EUR */
            return_currency?: string | null;
            source_event_counts: components["schemas"]["OSSMultiJurisdictionSourceEventCounts"];
            /**
             * @example nil_return_candidate
             * @enum {string}
             */
            status: "reportable_lines_present" | "nil_return_candidate" | "review_required" | "registration_required" | "registration_ambiguous" | "registration_details_incomplete" | "missing_exchange_rate" | "summary_event_cap_exceeded";
            /** @example No imported-goods source events were recorded for this month. */
            status_detail: string;
            totals?: components["schemas"]["OSSQuarterlySummaryTotals"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSMultiJurisdictionReportResponse: {
            /**
             * Format: date-time
             * @example 2026-05-07 10:15:30+00:00
             */
            generated_at: string;
            ioss: components["schemas"]["OSSMultiJurisdictionIOSS"];
            jurisdictions: components["schemas"]["OSSMultiJurisdictionExposure"][];
            /**
             * @example [
             *       "Union and non-Union OSS return periods are calendar quarters; the import scheme return period is a calendar month."
             *     ]
             */
            official_basis: string[];
            /**
             * Format: date
             * @example 2026-03-31
             */
            period_end: string;
            /** @example 2026-Q1 */
            period_key: string;
            /**
             * Format: date
             * @example 2026-01-01
             */
            period_start: string;
            /** @example oss_ioss_multi_jurisdiction_preview */
            report_kind: string;
            union_oss: components["schemas"]["OSSMultiJurisdictionUnionOSS"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSMultiJurisdictionSourceEventCounts: {
            /** @example 2 */
            excluded: number;
            /** @example 118 */
            included: number;
            /** @example 120 */
            total: number;
        };
        OSSMultiJurisdictionUnionOSS: {
            /**
             * Format: date
             * @example 2026-04-30
             */
            filing_due_date: string;
            /** @example 4 */
            jurisdiction_count: number;
            /** @example DE */
            member_state_identification: string;
            /** @example false */
            nil_return_eligible: boolean;
            /**
             * @example quarter
             * @enum {string}
             */
            period_kind: "quarter";
            /** @example EUR */
            return_currency: string;
            /**
             * @example union_oss
             * @enum {string}
             */
            scheme_type: "union_oss";
            source_event_counts: components["schemas"]["OSSMultiJurisdictionSourceEventCounts"];
            /**
             * @example reportable_lines_present
             * @enum {string}
             */
            status: "reportable_lines_present" | "nil_return_candidate" | "review_required";
            /** @example This quarter has included Union OSS lines ready for accountant review. */
            status_detail: string;
            totals: components["schemas"]["OSSQuarterlySummaryTotals"];
        };
        OSSQuarterlySummaryBalance: {
            /**
             * Format: int64
             * @example -500
             */
            correction_vat_amount_minor: bigint;
            /**
             * Format: int64
             * @example 28500
             */
            current_vat_amount_minor: bigint;
            /** @example true */
            included_in_payable_total: boolean;
            /** @example FR */
            member_state_consumption: string;
            /**
             * Format: int64
             * @example 28000
             */
            vat_amount_minor: bigint;
        };
        OSSQuarterlySummaryCorrection: {
            /** @example FR */
            member_state_consumption: string;
            /** @example 2025-Q4 */
            original_period_key: string;
            /** @example 1 */
            source_event_count: number;
            /**
             * Format: int64
             * @example -500
             */
            vat_correction_amount_minor: bigint;
        };
        OSSQuarterlySummaryExportBalance: {
            /**
             * @description Major-unit decimal string in the return currency.
             * @example -2.00
             */
            correction_vat_amount: string;
            /**
             * @description Major-unit decimal string in the return currency.
             * @example 20.00
             */
            current_vat_amount: string;
            /** @example true */
            included_in_payable_total: boolean;
            /** @example FR */
            member_state_consumption: string;
            /**
             * @description Major-unit payable VAT balance in the return currency.
             * @example 18.00
             */
            vat_amount: string;
        };
        OSSQuarterlySummaryExportCorrection: {
            /** @example FR */
            member_state_consumption: string;
            /** @example 2025-Q4 */
            original_period_key: string;
            /** @example 1 */
            source_event_count: number;
            /**
             * @description Major-unit decimal string in the return currency.
             * @example -2.00
             */
            vat_correction_amount: string;
        };
        OSSQuarterlySummaryExportResponse: {
            manifest: components["schemas"]["OSSReportExportManifest"];
            summary: components["schemas"]["OSSQuarterlySummaryExportSummary"];
        };
        OSSQuarterlySummaryExportRow: {
            /** @example DE */
            dispatch_country?: string | null;
            /** @example PL */
            fixed_establishment_country?: string | null;
            /** @example FR */
            member_state_consumption: string;
            /**
             * @example standard
             * @enum {string}
             */
            return_rate_category: "standard" | "reduced";
            /**
             * @example 2b
             * @enum {string}
             */
            return_section: "2a" | "2b" | "2c" | "2d";
            /** @example 1 */
            source_event_count: number;
            /**
             * @description Aggregated supply type in the Union OSS return.
             * @example goods
             * @enum {string}
             */
            supply_kind: "goods" | "services";
            /**
             * @description Major-unit decimal string in the return currency.
             * @example 100.00
             */
            taxable_amount: string;
            /**
             * @description Major-unit decimal string in the return currency.
             * @example 20.00
             */
            vat_amount: string;
            /**
             * @description VAT rate percentage rendered for export readability.
             * @example 20.00
             */
            vat_rate_pct: string;
        };
        OSSQuarterlySummaryExportSummary: {
            balances?: components["schemas"]["OSSQuarterlySummaryExportBalance"][];
            corrections?: components["schemas"]["OSSQuarterlySummaryExportCorrection"][];
            /** @example 2 */
            excluded_source_event_count: number;
            /** @example 118 */
            included_source_event_count: number;
            /** @example DE */
            member_state_identification: string;
            /**
             * Format: date
             * @example 2026-03-31
             */
            period_end: string;
            /** @example 2026-Q1 */
            period_key: string;
            /**
             * Format: date
             * @example 2026-01-01
             */
            period_start: string;
            /** @example EUR */
            return_currency: string;
            rows: components["schemas"]["OSSQuarterlySummaryExportRow"][];
            /**
             * @example union_oss
             * @enum {string}
             */
            scheme_type: "union_oss";
            /** @example 120 */
            total_source_event_count: number;
            totals: components["schemas"]["OSSReportExportTotals"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSQuarterlySummaryResponse: {
            balances?: components["schemas"]["OSSQuarterlySummaryBalance"][];
            corrections?: components["schemas"]["OSSQuarterlySummaryCorrection"][];
            /** @example 2 */
            excluded_source_event_count: number;
            /** @example 118 */
            included_source_event_count: number;
            /** @example DE */
            member_state_identification: string;
            /**
             * Format: date
             * @example 2026-03-31
             */
            period_end: string;
            /** @example 2026-Q1 */
            period_key: string;
            /**
             * Format: date
             * @example 2026-01-01
             */
            period_start: string;
            /** @example EUR */
            return_currency: string;
            rows: components["schemas"]["OSSQuarterlySummaryRow"][];
            /**
             * @example union_oss
             * @enum {string}
             */
            scheme_type: "union_oss";
            /** @example 120 */
            total_source_event_count: number;
            totals: components["schemas"]["OSSQuarterlySummaryTotals"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSQuarterlySummaryRow: {
            /** @example DE */
            dispatch_country?: string | null;
            /** @example PL */
            fixed_establishment_country?: string | null;
            /** @example FR */
            member_state_consumption: string;
            /**
             * @example standard
             * @enum {string}
             */
            return_rate_category: "standard" | "reduced";
            /**
             * @example 2b
             * @enum {string}
             */
            return_section: "2a" | "2b" | "2c" | "2d";
            /** @example 4 */
            source_event_count: number;
            /**
             * @description Aggregated supply type in the Union OSS return.
             * @example goods
             * @enum {string}
             */
            supply_kind: "goods" | "services";
            /**
             * Format: int64
             * @example 10000
             */
            taxable_amount_minor: bigint;
            /**
             * Format: int64
             * @example 2000
             */
            vat_amount_minor: bigint;
            /** @example 2000 */
            vat_rate_bps: number;
        };
        OSSQuarterlySummaryTotals: {
            /**
             * Format: int64
             * @example -1200
             */
            correction_vat_amount_minor: bigint;
            /**
             * Format: int64
             * @example 79800
             */
            current_vat_amount_minor: bigint;
            /**
             * Format: int64
             * @example 420000
             */
            taxable_amount_minor: bigint;
            /**
             * Format: int64
             * @example 78600
             */
            vat_amount_minor: bigint;
        };
        OSSQuarterlySummaryWarning: {
            /**
             * @description Warning code. Current values include `classification_excluded`, `missing_exchange_rate_excluded`, `needs_review_excluded`, `correction_reference_missing_excluded`, `correction_reference_invalid_excluded`, `unsupported_rate_category_excluded`, and `unsupported_supply_kind_excluded`.
             * @example missing_exchange_rate_excluded
             */
            code: string;
            /** @example 3 */
            count: number;
        };
        OSSReportExportManifest: {
            /** @example Quarter-end ECB reference rates on 2026-03-31 are used whenever return-currency normalization is required. */
            conversion_rule: string;
            /** @example union_oss_quarterly_summary_preview */
            export_kind: string;
            /** @example 2 */
            export_version: number;
            /**
             * Format: date-time
             * @example 2026-05-07 10:15:30+00:00
             */
            generated_at: string;
            /** @example DE */
            member_state_identification: string;
            /**
             * Format: date
             * @example 2026-03-31
             */
            period_end: string;
            /** @example 2026-Q1 */
            period_key: string;
            /**
             * Format: date
             * @example 2026-01-01
             */
            period_start: string;
            /** @example EUR */
            return_currency: string;
            /**
             * @example union_oss
             * @enum {string}
             */
            scheme_type: "union_oss";
            /** @example Current-period Union OSS rows stay grouped by return section and VAT rate. Refunds, cancellations, credit notes, and adjustments with a valid original-event reference are emitted either as same-period line offsets or as later-period correction rows keyed by the original tax period and Member State of consumption. */
            scope_note: string;
            source_event_counts: components["schemas"]["OSSReportExportManifestSourceEventCounts"];
            warnings?: components["schemas"]["OSSQuarterlySummaryWarning"][];
        };
        OSSReportExportManifestSourceEventCounts: {
            /** @example 2 */
            excluded: number;
            /** @example 118 */
            included: number;
            /** @example 120 */
            total: number;
        };
        OSSReportExportTotals: {
            /**
             * @description Major-unit decimal string for later-period corrections in the return currency.
             * @example -2.00
             */
            correction_vat_amount: string;
            /**
             * @description Major-unit decimal string for current-quarter VAT in the return currency.
             * @example 20.00
             */
            current_vat_amount: string;
            /**
             * @description Major-unit decimal string in the return currency.
             * @example 100.00
             */
            taxable_amount: string;
            /**
             * @description Major-unit decimal string for payable VAT in the return currency.
             * @example 18.00
             */
            vat_amount: string;
        };
        RateProvenance: {
            /** Format: date-time */
            approved_at?: string | null;
            /** Format: date-time */
            effective_at: string;
            /** @enum {string} */
            evidence_status: "verified" | "legacy_unverifiable" | "unavailable";
            mapping_sha256?: string;
            mapping_version?: string;
            rate_data_version?: string;
            rate_matrix_sha256?: string;
            rate_row_digest?: string;
            /** @enum {string} */
            schema_version: "rate-evidence/v1";
            /** @enum {string} */
            source: "eu_tedb" | "legacy_recorded_window";
            source_evidence: components["schemas"]["RateSnapshotReference"][];
            source_manifest_sha256?: string;
        };
        RateSnapshotReference: {
            canonical_sha256: string;
            raw_sha256: string;
            /** Format: date-time */
            retrieved_at: string;
            /**
             * Format: uuid
             * @description Opaque public evidence-snapshot identifier.
             */
            snapshot_id: string;
        };
        SmeCodeDetail: {
            /**
             * @description Human-readable description of the code
             * @example Growing of cereals (except rice)
             */
            description: string;
            /**
             * @description Classification code value
             * @example 01.1
             */
            value: string;
        };
        SmeEligibilityPolicy: {
            /** @description Article 288 exclusion quarantine period (verbatim TEDB text) */
            exclusion_article288_quarantine_period?: string | null;
            /** @description Single national annual threshold applies */
            one_national_annual_threshold?: boolean | null;
            /** @description Voluntary cessation flag under Article 290 */
            voluntary_cessation_article290?: boolean | null;
        };
        SmeEligibilityRequest: {
            /**
             * Format: int64
             * @description Annual turnover in minor units of the national currency
             * @example 1800000
             */
            annual_turnover_nac: bigint;
            /**
             * @description ISO 3166-1 alpha-2 country code (TEDB uses EL for Greece)
             * @example DE
             */
            country: string;
            /**
             * @description ISO 4217 currency code matching the country's national currency on reference_date
             * @example EUR
             */
            currency: string;
            /**
             * Format: date
             * @description Optional YYYY-MM-DD date for threshold lookup. Defaults to today.
             * @example 2025-01-01
             */
            reference_date?: string;
        };
        SmeEligibilityResponse: {
            /**
             * Format: int64
             * @description Echo of the submitted turnover in minor units
             * @example 1800000
             */
            annual_turnover_nac: bigint;
            /** @example DE */
            country: string;
            /** @example EUR */
            currency: string;
            /**
             * Format: date
             * @description Effective date of the underlying TEDB data
             * @example 2024-01-01
             */
            data_situation_on: string;
            /** @example Domestic-only check (Art. 284 VAT Directive). Does not evaluate the EU cross-border SME scheme (Art. 284a). Consult a tax advisor for formal eligibility decisions. */
            disclaimer: string;
            /**
             * Format: date
             * @description ECB reference-rate date used for `ecb_rate_eur`.
             * @example 2025-01-01
             */
            ecb_rate_date?: string | null;
            /**
             * Format: double
             * @description ECB reference rate used to display the national threshold in EUR, expressed as 1 EUR equals this many units of the submitted currency.
             * @example 4.275
             */
            ecb_rate_eur?: number | null;
            /**
             * @description Explicit comparison result. Indeterminate means no usable same-currency national threshold was available and no eligibility conclusion was made.
             * @example eligible
             * @enum {string}
             */
            eligibility_status: "eligible" | "ineligible" | "indeterminate";
            /**
             * @description Whether the turnover is within the exemption threshold; null when eligibility_status is indeterminate
             * @example true
             */
            eligible_for_exemption: boolean | null;
            /**
             * Format: int64
             * @description Amount by which turnover exceeds the threshold, 0 if within, or null when eligibility_status is indeterminate
             * @example 0
             */
            exceeded_by_nac: bigint | null;
            /**
             * Format: double
             * @description Main exemption threshold in whole EUR units
             * @example 22000
             */
            exemption_threshold_eur?: number | null;
            /**
             * Format: double
             * @description Main exemption threshold in whole national-currency units; null when unavailable or when the selected evidence belongs to a different effective currency period
             * @example 22000
             */
            exemption_threshold_nac?: number | null;
            policy: components["schemas"]["SmeEligibilityPolicy"];
            /**
             * Format: date
             * @example 2025-01-01
             */
            reference_date: string;
            /**
             * @description TEDB threshold type (e.g. Regular scheme)
             * @example Regular scheme
             */
            scheme_type: string;
            sectorals: components["schemas"]["SmeEligibilitySectoral"][];
        };
        SmeEligibilitySectoral: {
            /** @description Additional comment (verbatim TEDB text) */
            comment?: string | null;
            /**
             * Format: double
             * @description Sectoral exemption threshold in whole EUR units
             */
            exemption_threshold_eur?: number | null;
            /**
             * Format: double
             * @description Sectoral exemption threshold in whole national-currency units; null when unavailable or when the parent evidence belongs to a different effective currency period
             */
            exemption_threshold_nac?: number | null;
            /** @description Sector label (verbatim TEDB text) */
            sector?: string | null;
        };
        SmeExemptionItem: {
            /** @description Article 290 quarantine period text (verbatim TEDB text) */
            article290QuarantinePeriod?: string | null;
            /** @description Article 288 exclusion quarantine period (verbatim TEDB text) */
            exclusionArticle288QuarantinePeriod?: string | null;
            /** @description National annual threshold flag */
            nationalAnnualThreshold?: boolean | null;
            /** @description Single national annual threshold applies */
            oneNationalAnnualThreshold?: boolean | null;
            /** @description Sector-specific exemption thresholds (empty array when none apply) */
            sectorals: components["schemas"]["SmeSectoralItem"][];
            /**
             * Format: double
             * @description Main exemption threshold in whole EUR units
             * @example 22000
             */
            thresholdEur?: number | null;
            /**
             * Format: double
             * @description Main exemption threshold in whole national-currency units
             * @example 22000
             */
            thresholdNac?: number | null;
            /** @description Transitional period exceeded policy text (verbatim TEDB text) */
            transitionalPeriodExceeded?: string | null;
            /** @description Voluntary cessation flag under Article 290 */
            voluntaryCessationArticle290?: boolean | null;
        };
        SmeSectoralItem: {
            /** @description CN classification codes for this sectoral threshold */
            cnCodes: components["schemas"]["SmeCodeDetail"][];
            /** @description Additional comment (verbatim TEDB text) */
            comment?: string | null;
            /** @description CPA classification codes for this sectoral threshold */
            cpaCodes: components["schemas"]["SmeCodeDetail"][];
            /**
             * Format: double
             * @description Sectoral exemption threshold in whole EUR units
             */
            exemptionThresholdEur?: number | null;
            /**
             * Format: double
             * @description Sectoral exemption threshold in whole national-currency units
             */
            exemptionThresholdNac?: number | null;
            /** @description Sector name (verbatim TEDB text) */
            sector?: string | null;
        };
        SmeThresholdItem: {
            /**
             * Format: double
             * @description Cash accounting annual threshold in whole EUR units
             */
            cashAccountingEur?: number | null;
            /**
             * Format: double
             * @description Cash accounting annual threshold in whole national-currency units
             */
            cashAccountingNac?: number | null;
            /**
             * @description EU/TEDB country code (TEDB uses "EL" for Greece)
             * @example DE
             */
            country: string;
            exemption: components["schemas"]["SmeExemptionItem"];
            /**
             * Format: double
             * @description Flat-rate scheme threshold in whole EUR units
             */
            flatRateSchemeEur?: number | null;
            /**
             * Format: double
             * @description Flat-rate scheme threshold in whole national-currency units
             */
            flatRateSchemeNac?: number | null;
            /**
             * @description ISO 4217 currency code of the national currency
             * @example EUR
             */
            nationalCurrency: string;
            /**
             * Format: double
             * @description Non-established business threshold in whole EUR units
             */
            nonEstablishedBusinessEur?: number | null;
            /**
             * Format: double
             * @description Non-established business threshold in whole national-currency units
             */
            nonEstablishedBusinessNac?: number | null;
            /**
             * Format: double
             * @description Reduced supply-of-services threshold in whole EUR units
             */
            reducedSupplyOfServicesEur?: number | null;
            /**
             * Format: double
             * @description Reduced supply-of-services threshold in whole national-currency units
             */
            reducedSupplyOfServicesNac?: number | null;
            /**
             * Format: date
             * @description Effective date of this record (YYYY-MM-DD)
             * @example 2024-01-01
             */
            situationOn: string;
            /**
             * @description Tax scheme name as reported by TEDB
             * @example VAT
             */
            taxName: string;
            /**
             * @description Threshold type as reported by TEDB
             * @example Regular scheme
             */
            thresholdType: string;
        };
        SmeThresholdsListResponse: {
            thresholds: components["schemas"]["SmeThresholdItem"][];
        };
        SourceProfile: {
            /** @example true */
            active: boolean;
            /**
             * @example [
             *       "headless-eu",
             *       "webshop-eu"
             *     ]
             */
            aliases: string[];
            /**
             * @example owned_store
             * @enum {string}
             */
            channel_type: "owned_store" | "marketplace" | "subscription" | "pos" | "wholesale" | "test" | "other";
            /**
             * Format: date-time
             * @example 2026-05-04T11:09:13Z
             */
            created_at: string;
            /** @example DE */
            default_country?: string | null;
            /** @example EUR */
            default_currency?: string | null;
            dispatch_country?: string | null;
            /**
             * Format: date
             * @description Effective date of the declared dispatch without supplier installation, when recorded.
             */
            dispatched_without_supplier_installation_from?: string;
            /** @example Headless EU Checkout */
            display_name: string;
            /**
             * Format: int64
             * @example 17
             */
            id: bigint;
            /** @example false */
            marketplace_deemed_supplier: boolean;
            /** @example Custom storefront */
            platform?: string | null;
            /** @example headless-checkout-eu */
            source_key: string;
            supplier_establishment_country?: string | null;
            /**
             * Format: date-time
             * @example 2026-05-04T11:09:13Z
             */
            updated_at: string;
        };
        SourceProfilesResponse: {
            /** @example 1 */
            activeCount: number;
            items: components["schemas"]["SourceProfile"][];
            /** @example 100 */
            maxProfiles: number;
        };
        TaxClassCountryRate: {
            /** @example DE */
            country: string;
            /**
             * Format: int64
             * @example 700
             */
            rate_bps: bigint;
            /**
             * Format: date-time
             * @description Recorded lookup-window start. Not yet guaranteed to be the legal applicability start.
             * @example 2020-01-01T00:00:00Z
             */
            valid_from: string;
            /**
             * Format: date-time
             * @description Recorded lookup-window end. Null means no recorded end.
             * @example null
             */
            valid_to?: string | null;
        };
        TaxClassDetailResponse: {
            /** @example Books — printed and electronic (including e-books) */
            description: string;
            /** @example Books & Publications */
            group_name: string;
            /** @example books_publications */
            group_slug: string;
            /** @example books */
            id: string;
            /** @example Books */
            name: string;
            rates: components["schemas"]["TaxClassCountryRate"][];
            /** @example tedb */
            source: string;
            /**
             * @example [
             *       "publications",
             *       "printed"
             *     ]
             */
            tags: string[];
        };
        TaxClassListItem: {
            /** @example Books — printed and electronic (including e-books) */
            description: string;
            /** @example Books & Publications */
            group_name: string;
            /** @example books_publications */
            group_slug: string;
            /** @example books */
            id: string;
            /** @example Books */
            name: string;
            /**
             * Format: int64
             * @example 700
             */
            preview_rate_bps?: bigint | null;
            /** @example tedb */
            source: string;
            /**
             * @example [
             *       "publications",
             *       "printed"
             *     ]
             */
            tags: string[];
        };
        TaxClassListResponse: {
            items: components["schemas"]["TaxClassListItem"][];
        };
        TaxRegistration: {
            /**
             * Format: date-time
             * @example 2026-05-07T09:00:00Z
             */
            created_at: string;
            /** @description Whether the current revision has the required declared identifier. Lifecycle status and date coverage are evaluated separately. */
            details_complete: boolean;
            /**
             * Format: date
             * @example 2026-05-01
             */
            effective_from: string;
            /**
             * Format: date
             * @example null
             */
            effective_to?: string | null;
            /**
             * Format: int64
             * @example 42
             */
            id: bigint;
            /**
             * @description Masked suffix derived from the stored canonical identifier.
             * @example •••1234
             */
            identifier_masked?: string;
            /** @enum {string} */
            identifier_type: "vat_identification_number" | "non_union_oss_identifier" | "ioss_identifier";
            /**
             * @description EU Member State code used as the Member State of identification for the scheme.
             * @example DE
             * @enum {string}
             */
            member_state_identification: "AT" | "BE" | "BG" | "CY" | "CZ" | "DE" | "DK" | "EE" | "EL" | "ES" | "FI" | "FR" | "HR" | "HU" | "IE" | "IT" | "LT" | "LU" | "LV" | "MT" | "NL" | "PL" | "PT" | "RO" | "SE" | "SI" | "SK";
            /**
             * @example ioss
             * @enum {string}
             */
            scheme_type: "union_oss" | "non_union_oss" | "ioss";
            /**
             * @description Registration lifecycle state. `ended` represents a real closed window; `excluded` retires a row that should not count toward coverage.
             * @example active
             * @enum {string}
             */
            status: "active" | "pending" | "ended" | "excluded";
            /**
             * Format: date-time
             * @example 2026-05-07T09:00:00Z
             */
            updated_at: string;
            /**
             * @deprecated
             * @description Compatibility alias for identifier_masked. Omitted when details are incomplete.
             */
            vat_registration_number_masked?: string;
        };
        TaxRegistrationsResponse: {
            items: components["schemas"]["TaxRegistration"][];
        };
        ThresholdCheckRequest: {
            /**
             * Format: int64
             * @description Consignment value in EUR minor units (IOSS only). Required when threshold_type is "ioss".
             */
            amount_minor?: bigint;
            /**
             * Format: date
             * @description Start date (OSS only). If supplied, must be 1 January of the cutoff year.
             */
            from?: string;
            /**
             * @description Threshold type. Determines check behavior.
             * @enum {string}
             */
            threshold_type: "oss" | "ioss";
            /**
             * Format: date
             * @description Inclusive UTC cutoff date (OSS only). Cannot be in the future; defaults to the current instant.
             */
            to?: string;
        };
        ThresholdCheckResponse: {
            /**
             * @description Separate applicability state; threshold evidence does not prove sole establishment or a taxation option
             * @enum {string}
             */
            article_59c_applicability_status?: "applicable" | "not_applicable" | "incomplete_evidence" | "conflicting_evidence";
            /**
             * @deprecated
             * @description Compatibility field; governed Article 59c evaluation does not use daily reporting conversion
             */
            converted_currencies?: string[];
            /** @example EUR */
            currency: string;
            /**
             * @description ISO 4217 minor-unit scale used by threshold and turnover amounts
             * @example 2
             */
            currency_scale: number;
            /**
             * @description Article 59c comparison for the current year (OSS only).
             * @enum {string}
             */
            current_comparison?: "unknown" | "at_or_below" | "above";
            /**
             * Format: int64
             * @description Aggregated qualifying net turnover after authenticated linked adjustments (OSS), or consignment value (IOSS)
             * @example 850000
             */
            current_minor: bigint;
            /** Format: int64 */
            current_year_blocking_event_count?: bigint;
            /** Format: int64 */
            current_year_candidate_event_count?: bigint;
            current_year_coverage?: components["schemas"]["Article59cCoverageGroup"][];
            /** @description First historical crossing; retained even when later authenticated adjustments reduce the final net amount */
            current_year_crossing?: components["schemas"]["Article59cCrossingEvidence"];
            /** Format: int64 */
            current_year_excluded_event_count?: bigint;
            /** Format: date-time */
            cutoff_at?: string;
            /** @description Threshold-evidence boundary; incomplete closing evidence after a proven historical crossing is distinguished from a state with no publishable exceeded/remaining conclusion */
            disclaimer?: string;
            establishment_country?: string;
            /**
             * @deprecated
             * @description Compatibility field; true means governed OSS evidence is incomplete, never that a partial EUR total was accepted
             */
            eur_only?: boolean;
            /**
             * @description Governed closing-evidence state. A successful incomplete response is returned only when an earlier authenticated crossing is already proven.
             * @enum {string}
             */
            evidence_status?: "resolved" | "incomplete_evidence";
            /** @description Whether an authenticated current- or preceding-year threshold crossing has been proven; once true, later adjustments do not reset it */
            exceeded: boolean;
            /** @enum {string} */
            filing_readiness?: "ready" | "not_ready" | "unknown" | "unsupported" | "blocked_by_treatment" | "not_required";
            /** @description True when immutable current- or preceding-year evidence proves a first crossing, independently of the closing balance and later evidence gaps */
            historical_crossing_proven: boolean;
            issues?: string[];
            /** Format: date */
            legal_effective_date?: string;
            /**
             * @description Closing-balance percentage of the threshold (0-100+); it may fall below 100 after a refund and does not reverse a proven crossing
             * @example 85
             */
            percentage_used: number;
            policy_digest?: string;
            policy_version?: string;
            /** Format: int64 */
            preceding_year_blocking_event_count?: bigint;
            /** Format: int64 */
            preceding_year_candidate_event_count?: bigint;
            preceding_year_coverage?: components["schemas"]["Article59cCoverageGroup"][];
            /** @description First historical preceding-year crossing; retained independently of the final adjusted net amount */
            preceding_year_crossing?: components["schemas"]["Article59cCrossingEvidence"];
            /** Format: int64 */
            preceding_year_excluded_event_count?: bigint;
            /**
             * @description Article 59c comparison for the preceding year (OSS only).
             * @enum {string}
             */
            previous_comparison?: "unknown" | "at_or_below" | "above";
            /** Format: int64 */
            previous_year_event_count?: bigint;
            /**
             * Format: int64
             * @description Preceding-calendar-year candidate net turnover (OSS only)
             */
            previous_year_minor?: bigint;
            primary_treatment_driver?: string;
            release_digest?: string;
            release_version?: string;
            /**
             * Format: int64
             * @description Closing-balance headroom before a crossing is proven; permanently zero after an authenticated current- or preceding-year crossing
             * @example 150000
             */
            remaining_minor: bigint;
            /**
             * Format: int64
             * @description Number of committed qualifying B2C sale and linked-adjustment events included in the OSS threshold calculation; zero for IOSS. Domestic and other ineligible supporting events are not counted
             * @example 12
             */
            source_event_count: bigint;
            /**
             * @description Whether the amount-based current/preceding-year comparison has all material evidence
             * @enum {string}
             */
            threshold_evidence_status?: "complete" | "incomplete" | "conflicting" | "not_applicable";
            /**
             * Format: int64
             * @description Reviewed threshold amount in `currency` minor units
             * @example 1000000
             */
            threshold_minor: bigint;
            /** @enum {string} */
            threshold_type: "oss" | "ioss";
            treatment_triggers?: components["schemas"]["Article59cTreatmentTrigger"][];
            /** @description Distinct currencies awaiting an approved statutory conversion policy */
            unconverted_currencies?: string[];
            /** @description True when within 10% of threshold but not exceeded */
            warning: boolean;
        };
        ThresholdItem: {
            /** @example EU */
            country: string;
            /** @example EUR */
            currency: string;
            description?: string | null;
            /**
             * Format: date
             * @example 2021-07-01
             */
            effective_from: string;
            /**
             * Format: date
             * @example null
             */
            effective_to?: string | null;
            /** @example abc123 */
            id: string;
            /**
             * Format: int64
             * @description Threshold amount in minor units (cents)
             * @example 1000000
             */
            threshold_amount_minor: bigint;
            /**
             * @example oss
             * @enum {string}
             */
            threshold_type: "oss" | "ioss";
        };
        ThresholdListResponse: {
            thresholds: components["schemas"]["ThresholdItem"][];
        };
        TransactionDetailResponse: {
            /**
             * Format: uuid
             * @description Permanently identical to `id`.
             */
            calculation_id: string;
            calculation_provenance: components["schemas"]["CalculationProvenance"];
            /** Format: uuid */
            id: string;
            rate_provenance: components["schemas"]["RateProvenance"];
            transaction: components["schemas"]["TransactionItem"];
        };
        TransactionItem: {
            /** @example DE */
            country: string;
            /** @example EUR */
            currency: string;
            /**
             * Format: int64
             * @example 11900
             */
            gross_amount_minor: bigint;
            /** Format: uuid */
            id: string;
            /**
             * Format: int64
             * @example 10000
             */
            net_amount_minor: bigint;
            /** @enum {string} */
            rate_evidence_status: "verified" | "legacy_unverifiable" | "unavailable";
            request_id: string;
            source_id?: string | null;
            /** @example standard */
            tax_class_id: string;
            /**
             * Format: date
             * @example 2026-03-15
             */
            transaction_date: string;
            /**
             * Format: int64
             * @example 1900
             */
            vat_amount_minor: bigint;
            /**
             * Format: int64
             * @example 1900
             */
            vat_rate_bps: bigint;
        };
        TransactionListResponse: {
            /**
             * @description Opaque, HMAC-signed cursor for the next page. Null when no more
             *     results. Treat as a black box — do not decode, edit, or persist
             *     long-term; cursors are bound to the issuing API process.
             */
            next_cursor?: string | null;
            transactions: components["schemas"]["TransactionItem"][];
        };
        UnionOSSLockedReturnExportResponse: {
            /** @example 256 */
            byte_size: number;
            /** @example application/json; charset=utf-8 */
            content_type: string;
            /**
             * Format: date-time
             * @example 2026-04-15 09:30:00+00:00
             */
            created_at: string;
            /**
             * @example json
             * @enum {string}
             */
            export_format: "csv" | "json";
            /** @example union_oss_quarterly_summary_locked */
            export_kind: string;
            /** @example 1 */
            export_version: number;
            /** @example union-oss-quarterly-summary-2026-Q1-locked.json */
            filename: string;
            /**
             * Format: int64
             * @example 101
             */
            id: bigint;
            /** @example aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */
            sha256_hex: string;
            /**
             * @example available
             * @enum {string}
             */
            status: "available";
        };
        UnionOSSLockedReturnPeriodListResponse: {
            current_period?: components["schemas"]["UnionOSSLockedReturnPeriodResponse"];
            items: components["schemas"]["UnionOSSLockedReturnPeriodResponse"][];
            /**
             * @example union_oss
             * @enum {string}
             */
            scheme_type: "union_oss";
        };
        UnionOSSLockedReturnPeriodResponse: {
            /**
             * Format: date
             * @example 2026-04-30
             */
            due_date: string;
            /** @example 2 */
            excluded_source_event_count: number;
            /** @example 4 */
            export_count: number;
            exports?: components["schemas"]["UnionOSSLockedReturnExportResponse"][];
            /**
             * Format: date-time
             * @example 2026-04-29 17:45:00+00:00
             */
            filed_at?: string | null;
            /** @example ready */
            filing_status: string;
            /** @example Union OSS filing preview is ready for review and export. */
            filing_status_detail: string;
            /**
             * Format: int64
             * @example 11
             */
            id: bigint;
            /** @example 118 */
            included_source_event_count: number;
            /** @example 4 */
            jurisdiction_count: number;
            /**
             * Format: date-time
             * @example 2026-04-15 09:30:00+00:00
             */
            latest_export_at?: string | null;
            /**
             * Format: date-time
             * @example 2026-04-15 09:30:00+00:00
             */
            locked_at: string;
            /** @example DE */
            member_state_identification: string;
            /** @example false */
            nil_return_eligible: boolean;
            /**
             * Format: date
             * @example 2026-03-31
             */
            period_end: string;
            /** @example 2026-Q1 */
            period_key: string;
            /**
             * @example quarter
             * @enum {string}
             */
            period_kind: "quarter";
            /**
             * Format: date
             * @example 2026-01-01
             */
            period_start: string;
            /** @example EUR */
            return_currency: string;
            /**
             * @example union_oss
             * @enum {string}
             */
            scheme_type: "union_oss";
            /**
             * @example locked
             * @enum {string}
             */
            status: "locked" | "filed";
            /**
             * Format: int64
             * @example 1234500
             */
            taxable_amount_minor: bigint;
            /** @example 120 */
            total_source_event_count: number;
            /**
             * Format: int64
             * @example 234555
             */
            vat_amount_minor: bigint;
            /** @example 1 */
            warning_count: number;
        };
        UnknownSource: {
            /**
             * Format: date
             * @example 2026-04-01
             */
            first_seen: string;
            /**
             * Format: date
             * @example 2026-05-04
             */
            last_seen: string;
            /** @example mobile-checkout */
            source_id: string;
            /**
             * Format: int64
             * @example 42
             */
            transaction_count: bigint;
        };
        UnknownSourcesResponse: {
            items: components["schemas"]["UnknownSource"][];
        };
        UpdateSourceProfileRequest: {
            active?: boolean;
            /**
             * @description Replace the full alias list for this source profile. Send an empty array to clear aliases.
             * @example [
             *       "headless-eu",
             *       "webshop-eu"
             *     ]
             */
            aliases?: string[];
            /**
             * @example owned_store
             * @enum {string}
             */
            channel_type?: "owned_store" | "marketplace" | "subscription" | "pos" | "wholesale" | "test" | "other";
            /**
             * @description Send an empty string to clear the stored default country.
             * @example DE
             */
            default_country?: string | null;
            /**
             * @description Send an empty string to clear the stored default currency.
             * @example EUR
             */
            default_currency?: string | null;
            /** @description Send an empty string to clear the stored dispatch country. */
            dispatch_country?: string | null;
            /** @description Send an empty string to clear the dispatch declaration date. */
            dispatched_without_supplier_installation_from?: string | null;
            /** @example Headless EU Checkout */
            display_name?: string;
            marketplace_deemed_supplier?: boolean;
            /**
             * @description Send an empty string to clear the stored platform label.
             * @example Custom storefront
             */
            platform?: string | null;
            /** @description Send an empty string to clear the stored supplier establishment country. */
            supplier_establishment_country?: string | null;
        };
        UpdateTaxRegistrationRequest: {
            active?: boolean;
            /**
             * Format: date
             * @example 2026-05-01
             */
            effective_from?: string;
            /**
             * @description Send an empty string to clear the stored end date.
             * @example
             */
            effective_to?: string | null;
            marketplace_deemed_supplier?: boolean;
            /**
             * @description Omit this property to preserve the current Member State of identification.
             * @example DE
             * @enum {string}
             */
            member_state_identification?: "AT" | "BE" | "BG" | "CY" | "CZ" | "DE" | "DK" | "EE" | "EL" | "ES" | "FI" | "FR" | "HR" | "HU" | "IE" | "IT" | "LT" | "LU" | "LV" | "MT" | "NL" | "PL" | "PT" | "RO" | "SE" | "SI" | "SK";
            /** @description Full identifier issued for the scheme. Union OSS uses the VAT identification number of the selected Member State, Non-Union OSS uses EU followed by nine digits, and IOSS uses IM followed by nine digits. Format checks establish customer-declared evidence. */
            registration_identifier?: string;
            /**
             * @description Registration lifecycle state. `ended` requires `effective_to`; `excluded` retires stale or duplicate rows without inventing a closing date.
             * @example ended
             * @enum {string}
             */
            status?: "active" | "pending" | "ended" | "excluded";
        };
        VatCalculateRequest: {
            /**
             * @description ISO 3166-1 alpha-2 country code
             * @example DE
             */
            country: string;
            /**
             * @description ISO 4217 currency code
             * @example EUR
             */
            currency: string;
            /**
             * Format: int64
             * @description Input amount in minor units. This compatibility field is gross when
             *     `price_includes_vat` is `true` and net when it is `false`.
             *     This required field must contain an explicit integer; omitted and
             *     `null` values are invalid. Send `0` for a zero amount.
             * @example 11900
             */
            gross_amount_minor: bigint;
            /**
             * @description Amount basis selector. `true` extracts VAT from the gross input;
             *     `false` adds VAT to the net input. This required field must be sent explicitly;
             *     omitted and `null` values are invalid.
             * @example true
             */
            price_includes_vat: boolean;
            /**
             * @description Tax class identifier (e.g., "standard", "reduced", "books")
             * @example standard
             */
            tax_class_id: string;
            /**
             * @description Optional transaction date. Defaults to current UTC time if omitted.
             *     Accepts RFC3339 (e.g., "2024-03-15T14:30:00Z") or YYYY-MM-DD (e.g., "2024-03-15") format.
             *     Future dates are allowed (useful for pre-orders and advance bookings).
             * @example 2024-06-20T10:30:00Z
             */
            transaction_date?: string;
        };
        VatCalculateResponse: {
            /**
             * Format: uuid
             * @description Existing `vat_transactions.id` for an authenticated stored calculation; null for an unowned non-persisted response.
             */
            calculation_id: string | null;
            calculation_provenance: components["schemas"]["CalculationProvenance"];
            /**
             * @description ISO 3166-1 alpha-2 country code
             * @example DE
             */
            country: string;
            /**
             * @description ISO 4217 currency code
             * @example EUR
             */
            currency: string;
            /**
             * Format: int64
             * @description Gross amount in minor units (includes VAT)
             * @example 11900
             */
            gross_amount_minor: bigint;
            /**
             * Format: int64
             * @description Net amount in minor units (excludes VAT)
             * @example 10000
             */
            net_amount_minor: bigint;
            rate_provenance: components["schemas"]["RateProvenance"];
            /**
             * Format: date-time
             * @description UTC calculation instant resolved from the request.
             * @example 2026-08-28T00:00:00Z
             */
            transaction_date: string;
            /**
             * Format: int64
             * @description VAT amount in minor units
             * @example 1900
             */
            vat_amount_minor: bigint;
            /**
             * Format: int64
             * @description VAT rate in basis points (1 bp = 0.01%)
             * @example 1900
             */
            vat_rate_bps: bigint;
        };
        VatRateResponse: {
            /**
             * @description ISO 3166-1 alpha-2 country code
             * @example DE
             */
            country: string;
            /**
             * Format: int64
             * @description VAT rate in basis points (1 bp = 0.01%)
             * @example 700
             */
            rate_bps: bigint;
            /**
             * @description Tax class identifier
             * @example books
             */
            tax_class_id: string;
            /**
             * Format: date-time
             * @description Recorded lookup-window start (RFC3339). Not yet guaranteed to be the legal applicability start.
             * @example 2020-01-01T00:00:00Z
             */
            valid_from: string;
            /**
             * Format: date-time
             * @description Recorded lookup-window end (RFC3339). Null means no recorded end.
             * @example null
             */
            valid_to?: string | null;
        };
    };
    responses: {
        /** @description Forbidden. The key lacks a required scope or the supplied context assertion does not match (auth_context_mismatch). */
        InsufficientScope: {
            headers: {
                "X-Request-ID": components["headers"]["RequestID"];
                "X-VAT-Environment": components["headers"]["VATEnvironment"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description Malformed or repeated context assertion. */
        InvalidExpectedContext: {
            headers: {
                "X-Request-ID": components["headers"]["RequestID"];
                "X-VAT-Environment": components["headers"]["VATEnvironment"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
    };
    parameters: {
        /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
        ExpectedContext: components["schemas"]["AuthContextID"];
    };
    requestBodies: never;
    headers: {
        /**
         * @description Request identifier for tracing. Returned in every response.
         * @example 7b9d5d3a-2c5d-4d8a-8f91-9b0c6c5b7f1d
         */
        RequestID: string;
        /** @description Data environment selected by the authenticated key. Sandbox data is isolated from production. Present after successful key authentication, including later error responses; missing or invalid key responses may omit it. */
        VATEnvironment: "sandbox" | "production";
    };
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    startAgentRegistration: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * Format: uuid
                     * @description Public Account ID shared by the account holder.
                     */
                    account_id: string;
                    /** @description Name displayed for the account holder to review. */
                    agent_name: string;
                    /** @enum {string} */
                    requested_credential_type: "api_key";
                    /** @enum {string} */
                    type: "anonymous";
                };
            };
        };
        responses: {
            /** @description Pending registration. Share the registration ID so the account holder can match the request in API Keys. Keep the claim token private. */
            202: {
                headers: {
                    "Cache-Control"?: "no-store, private";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Private token used by the agent to claim an approved key. */
                        claim_token: string;
                        /** @enum {string} */
                        environment: "sandbox";
                        /** @description Seconds until the registration expires. */
                        expires_in: number;
                        /** @description Minimum seconds between claim attempts. */
                        interval: number;
                        /**
                         * Format: uuid
                         * @description Request reference displayed to the account holder.
                         */
                        registration_id: string;
                        scopes: "calculate-only"[];
                        /** Format: uri */
                        verification_uri: string;
                    };
                };
            };
            /** @description Invalid or unsupported registration request. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Account is unavailable. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description HTTPS required. */
            421: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Request rate limit or account pending request limit exceeded. */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Registration is temporarily unavailable. */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    claimAgentAPIKey: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    claim_token: string;
                };
            };
        };
        responses: {
            /** @description Approved credential. Send it in X-API-Key for subsequent HTTPS requests. */
            200: {
                headers: {
                    "Cache-Control"?: "no-store, private";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        api_key: string;
                        /** @enum {string} */
                        credential_type: "api_key";
                        /** @enum {string} */
                        environment: "sandbox";
                        /** Format: date-time */
                        expires_at: string;
                        scopes: "calculate-only"[];
                    };
                };
            };
            /** @description Invalid or expired claim token. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The account holder rejected the registration. */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Approval is pending or the registration has closed. */
            409: {
                headers: {
                    /** @description Seconds to wait when authorization is pending. */
                    "Retry-After"?: number;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description HTTPS required. */
            421: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Request rate limit exceeded. */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Claim is temporarily unavailable. */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    health: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Service is alive */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Deployed build revision, when available. */
                        build_commit?: string;
                        /** @example ok */
                        status?: string;
                    };
                };
            };
        };
    };
    ready: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Service is ready */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example ready */
                        status?: string;
                    };
                };
            };
            /** @description A readiness check failed or the service is draining. */
            503: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example not_ready */
                        status?: string;
                    };
                };
            };
        };
    };
    getAuthContext: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Authenticated data context and assigned scopes. */
            200: {
                headers: {
                    /** @description Prevents storage by clients and shared caches. */
                    "Cache-Control"?: "no-store";
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthContext"];
                };
            };
            400: components["responses"]["InvalidExpectedContext"];
            /** @description Missing or invalid API key. */
            401: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description HTTPS required. */
            421: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Applicable key or IP rate limit exceeded. */
            429: {
                headers: {
                    /** @description Seconds to wait before retrying the request. */
                    "Retry-After"?: number;
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Key data environment unavailable. */
            503: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    complianceThresholdStatus: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Compliance status */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ComplianceStatusResponse"];
                };
            };
            400: components["responses"]["InvalidExpectedContext"];
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    resolveInformationalTaxClass: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InformationalVATQuery"];
            };
        };
        responses: {
            /** @description Source options or explicit informational unavailability. */
            200: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InformationalVATResult"];
                };
            };
            /** @description Invalid or unknown request fields. */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Authentication required. */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Request exceeds 16384 bytes. */
            413: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Rate limit exceeded. */
            429: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Source reader unavailable. */
            503: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    lookupInformationalVAT: {
        parameters: {
            query: {
                catalog_version?: string;
                /** @description Full item code; conventional CN spaces or CPA dots accepted. */
                code: string;
                /** @description EU ISO country; GR and TEDB alias EL are accepted. */
                country: string;
                /** @description Transaction calendar date in UTC. */
                date: string;
                scheme: "cn" | "cpa";
                /** @description Retained upstream source snapshot pin. */
                snapshot_id?: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Informational options or explicit unavailability; never filing authority. */
            200: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InformationalVATResult"];
                };
            };
            /** @description Invalid, duplicate or unknown query parameters. */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Authentication required. */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Rate limit exceeded. */
            429: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Source reader unavailable. */
            503: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    calculateInformationalVAT: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InformationalVATCalculationRequest"];
            };
        };
        responses: {
            /** @description Conditional arithmetic with retained source provenance, not a saved transaction. */
            200: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InformationalVATResult"] & {
                        calculation: components["schemas"]["InformationalVATCalculation"];
                    };
                };
            };
            /** @description Invalid, missing or overflowing monetary input; unknown JSON fields. */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Authentication required. */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Request exceeds 16384 bytes. */
            413: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No current exact numeric source option; no calculation persisted. */
            422: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Rate limit exceeded. */
            429: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Source reader unavailable. */
            503: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getUnionOSSCountryVATBreakdown: {
        parameters: {
            query: {
                /**
                 * @description Quarter key in `YYYY-Qn` format.
                 * @example 2026-Q1
                 */
                period: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Country VAT breakdown preview */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OSSCountryVATBreakdownResponse"];
                };
            };
            /** @description Missing or invalid quarter parameter */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Country VAT breakdown blocked by missing/ambiguous registration or missing required ECB rates */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Country VAT breakdown exceeds the current preview event cap */
            422: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    exportUnionOSSCountryVATBreakdown: {
        parameters: {
            query: {
                /**
                 * @description Export format.
                 * @example json
                 */
                format: "csv" | "json";
                /**
                 * @description Quarter key in `YYYY-Qn` format.
                 * @example 2026-Q1
                 */
                period: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Country VAT breakdown export package */
            200: {
                headers: {
                    /** @description Attachment filename for the exported package. */
                    "Content-Disposition"?: string;
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OSSCountryVATBreakdownExportResponse"];
                    "text/csv": string;
                };
            };
            /** @description Missing or invalid quarter/format parameter */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Export blocked by missing/ambiguous registration or missing required ECB rates */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Export exceeds the current preview event cap */
            422: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getOSSIOSSFilingPrepWorkspace: {
        parameters: {
            query: {
                /**
                 * @description Quarter key in `YYYY-Qn` format.
                 * @example 2026-Q1
                 */
                period: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Filing-prep workspace for the selected quarter */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OSSFilingPrepResponse"];
                };
            };
            /** @description Missing or invalid quarter parameter */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    listLockedUnionOSSReturnPeriods: {
        parameters: {
            query?: {
                /**
                 * @description Optional quarter key in `YYYY-Qn` format used to load the current locked quarter details and exports.
                 * @example 2026-Q1
                 */
                period?: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Locked Union OSS return periods */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UnionOSSLockedReturnPeriodListResponse"];
                };
            };
            /** @description Invalid quarter parameter */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    lockUnionOSSReturnPeriod: {
        parameters: {
            query: {
                /**
                 * @description Quarter key in `YYYY-Qn` format.
                 * @example 2026-Q1
                 */
                period: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Locked Union OSS return period created */
            201: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UnionOSSLockedReturnPeriodResponse"];
                };
            };
            /** @description Missing or invalid quarter parameter */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description A locked return period already exists for the requested quarter */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Locking blocked by report-preview validation rules */
            422: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    downloadLockedUnionOSSExportArtifact: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path: {
                /**
                 * @description Numeric locked export identifier.
                 * @example 41
                 */
                exportID: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Locked export artifact download */
            200: {
                headers: {
                    /** @description Attachment filename for the stored artifact. */
                    "Content-Disposition"?: string;
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                    "text/csv": string;
                };
            };
            /** @description Invalid export identifier */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Locked return export was not found */
            404: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    markLockedUnionOSSReturnPeriodFiled: {
        parameters: {
            query: {
                /**
                 * @description Quarter key in `YYYY-Qn` format.
                 * @example 2026-Q1
                 */
                period: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Locked Union OSS return period marked as filed */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UnionOSSLockedReturnPeriodResponse"];
                };
            };
            /** @description Missing or invalid quarter parameter */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description No locked return period exists for the requested quarter */
            404: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getOSSIOSSMultiJurisdictionPreview: {
        parameters: {
            query: {
                /**
                 * @description Quarter key in `YYYY-Qn` format.
                 * @example 2026-Q1
                 */
                period: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Multi-jurisdiction filing exposure preview */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OSSMultiJurisdictionReportResponse"];
                };
            };
            /** @description Missing or invalid quarter parameter */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Report blocked by missing/ambiguous registration or missing required ECB rates */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Report exceeds the current preview event cap */
            422: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getUnionOSSAccountantReport: {
        parameters: {
            query: {
                /**
                 * @description Quarter key in `YYYY-Qn` format.
                 * @example 2026-Q1
                 */
                period: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Accountant-friendly Union OSS quarter view */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OSSAccountantReportResponse"];
                };
            };
            /** @description Missing or invalid quarter parameter */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Report blocked by missing/ambiguous registration or missing required ECB rates */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Report exceeds the current preview event cap */
            422: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getUnionOSSQuarterlySummary: {
        parameters: {
            query: {
                /**
                 * @description Quarter key in `YYYY-Qn` format.
                 * @example 2026-Q1
                 */
                period: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Quarterly summary preview */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OSSQuarterlySummaryResponse"];
                };
            };
            /** @description Missing or invalid quarter parameter */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Quarterly summary blocked by missing/ambiguous registration or missing required ECB rates */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Quarterly summary exceeds the current preview event cap */
            422: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    exportUnionOSSQuarterlySummary: {
        parameters: {
            query: {
                /**
                 * @description Export format.
                 * @example csv
                 */
                format: "csv" | "json";
                /**
                 * @description Quarter key in `YYYY-Qn` format.
                 * @example 2026-Q1
                 */
                period: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Quarterly summary export package */
            200: {
                headers: {
                    /** @description Attachment filename for the exported package. */
                    "Content-Disposition"?: string;
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OSSQuarterlySummaryExportResponse"];
                    "text/csv": string;
                };
            };
            /** @description Missing or invalid quarter/format parameter */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Export blocked by missing/ambiguous registration or missing required ECB rates */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Export exceeds the current preview event cap */
            422: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    listSources: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Source profiles for the authenticated account */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SourceProfilesResponse"];
                };
            };
            400: components["responses"]["InvalidExpectedContext"];
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    createSource: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateSourceProfileRequest"];
            };
        };
        responses: {
            /** @description Source profile created */
            201: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SourceProfile"];
                };
            };
            /** @description Invalid request body or field value */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Duplicate source key or active-profile cap reached */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    updateSource: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path: {
                /** @description Numeric source profile ID. */
                id: bigint;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateSourceProfileRequest"];
            };
        };
        responses: {
            /** @description Source profile updated */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SourceProfile"];
                };
            };
            /** @description Invalid source profile ID or request body */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Source profile not found for the authenticated account */
            404: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Active-profile cap reached while reactivating the profile */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    listUnknownSources: {
        parameters: {
            query?: {
                /** @description Maximum number of unknown source tags to return. */
                limit?: number;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Unmapped source tags for the authenticated account */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UnknownSourcesResponse"];
                };
            };
            /** @description Invalid limit value */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    listCommittedSupplyEvents: {
        parameters: {
            query?: {
                /** @description Retained input status. */
                classification_status?: "classified" | "excluded" | "needs_review";
                country?: string;
                currency?: string;
                cursor?: string;
                event_id?: string;
                /** @description Inclusive UTC calendar date. */
                from?: string;
                limit?: number;
                order_id?: string;
                /** @description Retained input category. */
                rate_category?: "standard" | "reduced" | "super_reduced" | "zero" | "parking" | "exempt" | "unknown";
                /** @description Alternative to source_profile_id. */
                source_id?: string;
                source_profile_id?: string;
                /** @description Inclusive UTC calendar date. */
                to?: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Account-owned API supply revisions. */
            200: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        items: components["schemas"]["CommittedSupplyRecord"][];
                        /** Format: uuid */
                        next_cursor: string | null;
                    };
                };
            };
            /** @description Invalid request body, identity, values, or query filters. */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description An active API key is required. */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description An operational key with the required scope and matching optional context is required. */
            403: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The API or write-specific limit was exceeded. */
            429: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request could not be completed. */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description A rate-limiting or authentication dependency was unavailable. */
            503: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    commitSupplyEvent: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "source_profile_id": "17",
                 *       "event": {
                 *         "external_order_id": "order-1001",
                 *         "external_line_id": "line-1",
                 *         "event_type": "sale",
                 *         "event_version": 1,
                 *         "supply_date": "2026-11-22",
                 *         "supply_occurred_at": "2026-11-22T10:15:00Z",
                 *         "customer_type": "b2c",
                 *         "supply_kind": "goods",
                 *         "currency": "EUR",
                 *         "currency_scale": 2,
                 *         "taxable_amount_minor": 10000,
                 *         "source_vat_amount_minor": 550,
                 *         "gross_amount_minor": 10550,
                 *         "prices_include_tax": false,
                 *         "member_state_consumption": "FR",
                 *         "supplier_establishment_country": "DE",
                 *         "dispatch_country": "DE",
                 *         "is_new_means_of_transport": false,
                 *         "is_assembly_or_installation": false,
                 *         "classification": {
                 *           "scheme": "cn",
                 *           "code": "49030000",
                 *           "catalog_version": "2026"
                 *         }
                 *       }
                 *     }
                 */
                "application/json": components["schemas"]["CommittedSupplyInput"];
            };
        };
        responses: {
            /** @description Exact retry. Returns the retained event ID without appending a revision or enqueueing new work. */
            200: {
                headers: {
                    /** @description Relative retained supply resource URL. */
                    Location?: string;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommittedSupplyReceipt"];
                };
            };
            /** @description A new immutable supply revision was committed. */
            201: {
                headers: {
                    /** @description Relative committed supply resource URL. */
                    Location?: string;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommittedSupplyReceipt"];
                };
            };
            /** @description Invalid request body, identity, values, or query filters. */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description An active API key is required. */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description An operational key with the required scope and matching optional context is required. */
            403: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The requested source or original sale is unavailable in this account. */
            404: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The identity or revision conflicts with retained evidence, or the reporting period is locked or filed. */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request exceeds 64 KiB. */
            413: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description No retained catalog leaf satisfies the supplied exact classification and date. */
            422: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The API or write-specific limit was exceeded. */
            429: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request could not be completed. */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description A rate-limiting or authentication dependency was unavailable. */
            503: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getCommittedSupplyEvent: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Committed supply with any current VAT Engine treatment. */
            200: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommittedSupplyRecord"];
                };
            };
            /** @description Invalid request body, identity, values, or query filters. */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description An active API key is required. */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description An operational key with the required scope and matching optional context is required. */
            403: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description No API-committed supply with this ID is visible to this account. */
            404: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The API or write-specific limit was exceeded. */
            429: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request could not be completed. */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description A rate-limiting or authentication dependency was unavailable. */
            503: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    listTaxClasses: {
        parameters: {
            query?: {
                /** @example 2026-03-09 */
                at?: string;
                /** @example DE */
                country?: string;
                /** @example books_publications */
                group?: string;
                /** @example book */
                q?: string;
                /** @example publications */
                tag?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Tax class list */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaxClassListResponse"];
                };
            };
            /** @description Invalid request parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getTaxClass: {
        parameters: {
            query?: {
                /** @example 2026-03-09 */
                at?: string;
                /** @example DE */
                country?: string;
            };
            header?: never;
            path: {
                /** @example books */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Tax class detail */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaxClassDetailResponse"];
                };
            };
            /** @description Invalid request parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Tax class not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    listTaxRegistrations: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Tax registrations for the authenticated account */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaxRegistrationsResponse"];
                };
            };
            400: components["responses"]["InvalidExpectedContext"];
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    createTaxRegistration: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateTaxRegistrationRequest"];
            };
        };
        responses: {
            /** @description Tax registration created */
            201: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaxRegistration"];
                };
            };
            /** @description Invalid request body or field value */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Overlapping registration window for the selected scheme */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    updateTaxRegistration: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path: {
                /** @description Numeric tax registration ID. */
                id: bigint;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateTaxRegistrationRequest"];
            };
        };
        responses: {
            /** @description Tax registration updated */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaxRegistration"];
                };
            };
            /** @description Invalid tax registration ID or request body */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Tax registration not found for the authenticated account */
            404: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Overlapping registration window for the selected scheme */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    listTransactions: {
        parameters: {
            query?: {
                /** @description Filter by the API key ID that created the transaction. */
                api_key_id?: bigint;
                /** @description ISO 3166-1 alpha-2 country code filter. */
                country?: string;
                /** @description ISO 4217 currency code filter. */
                currency?: string;
                /**
                 * @description Pagination cursor from a previous response's `next_cursor`. The value
                 *     is opaque (HMAC-signed) — do not parse, modify, or construct it on
                 *     the client. Cursors are only valid for the current API process and
                 *     may be invalidated on backend restart.
                 */
                cursor?: string;
                /** @description Start date (YYYY-MM-DD). Inclusive. */
                from?: string;
                /** @description Number of transactions per page (1–500). */
                limit?: number;
                /** @description Filter by the raw source/store/channel tag captured from X-Source-ID. Mutually exclusive with `source_profile_id`. */
                source_id?: string;
                /** @description Filter by managed source profile ID, resolving the profile source key and any configured aliases. Mutually exclusive with `source_id`. */
                source_profile_id?: bigint;
                /** @description Filter by tax class ID. */
                tax_class_id?: string;
                /** @description End date (YYYY-MM-DD). Inclusive. */
                to?: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Transaction list */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransactionListResponse"];
                };
            };
            /** @description Invalid query parameters */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getTransaction: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Tenant-owned transaction and immutable calculation provenance */
            200: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransactionDetailResponse"];
                };
            };
            /** @description Malformed transaction UUID (`invalid_transaction_id`) */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Transaction is nonexistent or not owned by the authenticated tenant */
            404: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Stored calculation evidence is unavailable or corrupt */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    aggregateTransactions: {
        parameters: {
            query?: {
                /** @description Filter by the API key ID that created the transaction. */
                api_key_id?: bigint;
                /** @description ISO 3166-1 alpha-2 country code filter. */
                country?: string;
                /** @description ISO 4217 currency code filter. */
                currency?: string;
                /** @description Start date (YYYY-MM-DD). Defaults to Jan 1 of current year. */
                from?: string;
                /** @description Grouping dimension. */
                group_by?: "country" | "tax_class" | "month";
                /** @description Filter by the raw source/store/channel tag captured from X-Source-ID. Mutually exclusive with `source_profile_id`. */
                source_id?: string;
                /** @description Filter by managed source profile ID, resolving the profile source key and any configured aliases. Mutually exclusive with `source_id`. */
                source_profile_id?: bigint;
                /** @description End date (YYYY-MM-DD). Defaults to today. */
                to?: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Aggregated results */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AggregateResponse"];
                };
            };
            /** @description Invalid parameters */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Aggregated amounts exceed the supported reporting range */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "summary_amount_overflow",
                     *       "detail": "aggregated amounts exceed the supported reporting range; narrow the date range or filters"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    exportTransactions: {
        parameters: {
            query: {
                /** @description Filter by the API key ID that created the transaction. */
                api_key_id?: bigint;
                /** @description ISO 3166-1 alpha-2 country code filter. */
                country?: string;
                /** @description ISO 4217 currency code filter. */
                currency?: string;
                /** @description Version 1 preserves the existing columns. Version 2 adds calculation and rate-evidence provenance. */
                export_version?: 1 | 2;
                /** @description Start date (YYYY-MM-DD). Inclusive. Required. */
                from: string;
                /** @description Filter by the raw source/store/channel tag captured from X-Source-ID. Mutually exclusive with `source_profile_id`. */
                source_id?: string;
                /** @description Filter by managed source profile ID, resolving the profile source key and any configured aliases. Mutually exclusive with `source_id`. */
                source_profile_id?: bigint;
                /** @description Filter by tax class ID. */
                tax_class_id?: string;
                /** @description End date (YYYY-MM-DD). Inclusive. Required. */
                to: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description CSV file download */
            200: {
                headers: {
                    /** @example attachment; filename=transactions.csv */
                    "Content-Disposition"?: string;
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "text/csv; charset=utf-8": string;
                };
            };
            /** @description Missing or invalid date range */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    calculateVat: {
        parameters: {
            query?: never;
            header?: {
                /** @description Optional visible-ASCII retry key for authenticated calls. Requires an explicit transaction_date. */
                "Idempotency-Key"?: string;
                /**
                 * @description Optional stable headless storefront or custom checkout tag captured for transaction reporting and bound into idempotent request identity. Does not affect VAT calculation. Invalid values return `400 invalid_source_id`. Do not include personal data or secrets.
                 * @example headless-checkout
                 */
                "X-Source-ID"?: string;
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VatCalculateRequest"];
            };
        };
        responses: {
            /** @description Successful VAT calculation */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VatCalculateResponse"];
                };
            };
            /** @description Invalid request */
            400: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized – missing or invalid API key */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description No usable rate for the country, tax class, and date (`rate_not_found`). */
            404: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Idempotency key conflict or ambiguous rate evidence */
            409: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "internal_error",
                     *       "detail": "an internal error occurred"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description A service required to process the request is temporarily unavailable. */
            503: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getVatRate: {
        parameters: {
            query: {
                /**
                 * @description Recorded-window date for rate lookup. Defaults to current UTC time if omitted.
                 *     Accepts RFC3339 (e.g., "2024-03-15T14:30:00Z") or YYYY-MM-DD (e.g., "2024-03-15") format.
                 *     The selected window is not yet guaranteed to be a source-supported legal applicability interval.
                 * @example 2024-01-15
                 */
                at?: string;
                /**
                 * @description ISO 3166-1 alpha-2 country code
                 * @example DE
                 */
                country: string;
                /**
                 * @description Tax class identifier (e.g., "standard", "reduced", "books")
                 * @example books
                 */
                tax_class_id: string;
            };
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description VAT rate found */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "country": "DE",
                     *       "tax_class_id": "books",
                     *       "rate_bps": 700,
                     *       "valid_from": "2020-01-01T00:00:00Z",
                     *       "valid_to": null
                     *     }
                     */
                    "application/json": components["schemas"]["VatRateResponse"];
                };
            };
            /** @description Invalid request parameters */
            400: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized – missing or invalid API key */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Rate not found */
            404: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_not_found",
                     *       "detail": "no VAT rate found for the specified country, tax class, and date"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Ambiguous rate (data integrity issue) */
            409: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_ambiguous",
                     *       "detail": "multiple VAT rates found (data integrity issue)"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "internal_error",
                     *       "detail": "an internal error occurred"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    checkSmeEligibility: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SmeEligibilityRequest"];
            };
        };
        responses: {
            /** @description Eligibility check result */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SmeEligibilityResponse"];
                };
            };
            /** @description Invalid request parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description No SME threshold data for the given country */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Currency mismatch for the given country */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    listSmeThresholds: {
        parameters: {
            query?: {
                /**
                 * @description ISO 3166-1 alpha-2 country code filter. TEDB uses "EL" for Greece.
                 * @example DE
                 */
                country?: string;
                /**
                 * @description Reference date (YYYY-MM-DD). Returns the most recent threshold per key
                 *     with `situation_on ≤ date`. Defaults to today UTC if omitted.
                 * @example 2026-01-01
                 */
                date?: string;
                /**
                 * @deprecated
                 * @description Legacy snake_case alias for `taxName`.
                 * @example VAT
                 */
                tax_name?: string;
                /**
                 * @description Case-insensitive exact match on the TEDB tax name (e.g. "VAT").
                 * @example VAT
                 */
                taxName?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description SME threshold list */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "thresholds": [
                     *         {
                     *           "country": "PL",
                     *           "situationOn": "2026-01-01",
                     *           "taxName": "VAT",
                     *           "thresholdType": "Regular scheme / specific scheme",
                     *           "nationalCurrency": "PLN",
                     *           "cashAccountingEur": 5000.25,
                     *           "cashAccountingNac": 21000.75,
                     *           "flatRateSchemeEur": 6000.5,
                     *           "flatRateSchemeNac": 25000.25,
                     *           "reducedSupplyOfServicesEur": 7000.75,
                     *           "reducedSupplyOfServicesNac": 29000.5,
                     *           "nonEstablishedBusinessEur": 8000.25,
                     *           "nonEstablishedBusinessNac": 33000.75,
                     *           "exemption": {
                     *             "thresholdEur": 22000.5,
                     *             "thresholdNac": 240000.75,
                     *             "oneNationalAnnualThreshold": true,
                     *             "nationalAnnualThreshold": false,
                     *             "exclusionArticle288QuarantinePeriod": "6 months",
                     *             "transitionalPeriodExceeded": "sectoral",
                     *             "voluntaryCessationArticle290": true,
                     *             "article290QuarantinePeriod": "12 months",
                     *             "sectorals": []
                     *           }
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": components["schemas"]["SmeThresholdsListResponse"];
                };
            };
            /** @description Invalid request parameters */
            400: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /** @description Seconds until the rate limit resets */
                    "Retry-After"?: number;
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    checkThreshold: {
        parameters: {
            query?: never;
            header?: {
                /** @description Supply one previously enrolled context ID. After authentication a malformed or repeated header returns 400 invalid_expected_context. A different valid ID returns 403 auth_context_mismatch before any business operation. */
                "X-VAT-Expected-Context"?: components["parameters"]["ExpectedContext"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ThresholdCheckRequest"];
            };
        };
        responses: {
            /** @description Threshold check result */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ThresholdCheckResponse"];
                };
            };
            /** @description Invalid request */
            400: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            403: components["responses"]["InsufficientScope"];
            /** @description Threshold not found for the given type */
            404: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Governed Article 59c evidence is incomplete or conflicting (OSS only) */
            422: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Article59cEvidenceIncompleteResponse"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    /**
                     * @description Seconds until the rate limit resets
                     * @example 60
                     */
                    "Retry-After"?: number;
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "rate_limit_exceeded",
                     *       "detail": "too many requests, please try again later"
                     *     }
                     */
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    "X-VAT-Environment": components["headers"]["VATEnvironment"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    listVatThresholds: {
        parameters: {
            query?: {
                /** @description ISO 3166-1 alpha-2 country code filter (e.g. EU, DE). */
                country?: string;
                /** @description Reference date (YYYY-MM-DD). Returns thresholds effective as of this date. */
                date?: string;
                /** @description Filter by threshold type. */
                type?: "oss" | "ioss";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Threshold list */
            200: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestID"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ThresholdListResponse"];
                };
            };
            /** @description Invalid request parameters */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
}
