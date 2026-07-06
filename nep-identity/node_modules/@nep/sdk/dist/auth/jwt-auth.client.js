"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwtAuthClient = createJwtAuthClient;
// JWT auth client — verifies access tokens and extracts NEP's scoped claims for authorization.
const jwt = __importStar(require("jsonwebtoken"));
const errors_1 = require("../errors");
/** Maps verified raw JWT claims onto the normalized {@link ScopedClaims} principal. */
function mapClaims(raw) {
    if (!raw.sub || !raw.tid) {
        throw new errors_1.UnauthorizedError('Token is missing required claims (sub, tid)');
    }
    return {
        userId: raw.sub,
        tenantId: raw.tid,
        roles: Array.isArray(raw.roles) ? raw.roles : [],
        scopeType: raw.scope_type ?? 'global',
        scopeId: raw.scope_id ?? null,
    };
}
/**
 * Creates the JWT auth client. Verifies signature/expiry/issuer/audience with jsonwebtoken
 * (HS256 via `secret`) and normalizes claims. Raises {@link UnauthorizedError} on any failure.
 *
 * Note: RS256/JWKS verification (`jwksUri`) is not yet implemented — provide `secret` for HS256.
 */
function createJwtAuthClient(options) {
    if (!options.secret) {
        // JWKS/RS256 path is a follow-up; fail loudly rather than silently accepting tokens.
        throw new Error('createJwtAuthClient currently requires an HS256 `secret` (jwksUri not yet supported)');
    }
    const secret = options.secret;
    const verifyOptions = {
        algorithms: ['HS256'],
        issuer: options.issuer,
        audience: options.audience,
        clockTolerance: options.clockToleranceSec,
    };
    async function verify(token) {
        let decoded;
        try {
            decoded = jwt.verify(token, secret, verifyOptions);
        }
        catch (err) {
            const reason = err instanceof Error ? err.message : 'verification failed';
            throw new errors_1.UnauthorizedError(`Invalid token: ${reason}`);
        }
        if (typeof decoded === 'string') {
            throw new errors_1.UnauthorizedError('Invalid token: unexpected payload');
        }
        return mapClaims(decoded);
    }
    return {
        verify,
        async requireScope(token, scopeType, scopeId) {
            const claims = await verify(token);
            if (claims.scopeType !== scopeType || claims.scopeId !== scopeId) {
                throw new errors_1.UnauthorizedError('Token does not grant the required scope', {
                    required: { scopeType, scopeId },
                    actual: { scopeType: claims.scopeType, scopeId: claims.scopeId },
                });
            }
            return claims;
        },
    };
}
//# sourceMappingURL=jwt-auth.client.js.map