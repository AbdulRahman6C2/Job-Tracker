CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    company VARCHAR(150) NOT NULL,
    role VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'applied'
        CHECK (status IN ('applied', 'interview', 'offer', 'rejected', 'withdrawn')),
    date_applied DATE NOT NULL DEFAULT CURRENT_DATE,
    resume_version VARCHAR(150),
    job_url TEXT,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_date ON applications(date_applied);