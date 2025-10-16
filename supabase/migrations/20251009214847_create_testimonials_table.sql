CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    title TEXT,
    quote TEXT NOT NULL,
    rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
    is_active BOOLEAN DEFAULT TRUE
);