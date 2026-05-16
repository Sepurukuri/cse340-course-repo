-- ========================================
-- Insert sample data: Organizations
-- ========================================

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

SELECT * FROM organization;

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert Sample Data: Service Projects
-- ========================================

INSERT INTO project
(organization_id, title, description, location, project_date)

VALUES

-- BrightFuture Builders
(1, 'Community Playground Renovation',
 'Renovating playground equipment for children in underserved neighborhoods.',
 'Salt Lake City, Utah',
 '2026-06-15'),

(1, 'Affordable Housing Build',
 'Constructing affordable housing units for low-income families.',
 'Boise, Idaho',
 '2026-07-20'),

(1, 'Bridge Safety Repairs',
 'Repairing aging pedestrian bridges in local communities.',
 'Denver, Colorado',
 '2026-08-05'),

(1, 'School Roof Replacement',
 'Replacing damaged roofs for public elementary schools.',
 'Phoenix, Arizona',
 '2026-09-10'),

(1, 'Community Garden Expansion',
 'Building new raised garden beds and irrigation systems.',
 'Las Vegas, Nevada',
 '2026-10-01'),

-- GreenHarvest Growers
(2, 'Urban Farming Workshop',
 'Teaching residents sustainable farming techniques.',
 'Portland, Oregon',
 '2026-06-12'),

(2, 'Neighborhood Greenhouse Project',
 'Building greenhouses for year-round community gardening.',
 'Seattle, Washington',
 '2026-07-08'),

(2, 'School Garden Initiative',
 'Creating educational gardens for local schools.',
 'San Diego, California',
 '2026-08-18'),

(2, 'Food Sustainability Fair',
 'Hosting a city-wide sustainability education event.',
 'Sacramento, California',
 '2026-09-22'),

(2, 'Community Compost Program',
 'Launching composting systems in urban neighborhoods.',
 'Eugene, Oregon',
 '2026-10-14'),

-- UnityServe Volunteers
(3, 'Local Food Drive',
 'Organizing volunteers to distribute food to families in need.',
 'Dallas, Texas',
 '2026-06-30'),

(3, 'Charity Clothing Distribution',
 'Collecting and distributing clothing donations.',
 'Houston, Texas',
 '2026-07-25'),

(3, 'Senior Citizen Assistance Day',
 'Helping senior citizens with home maintenance tasks.',
 'Austin, Texas',
 '2026-08-09'),

(3, 'Youth Mentorship Program',
 'Connecting volunteers with at-risk youth for mentoring.',
 'San Antonio, Texas',
 '2026-09-17'),

(3, 'Holiday Volunteer Festival',
 'Organizing volunteers for seasonal charity events.',
 'El Paso, Texas',
 '2026-12-05');