/**
 * Visual Inspiration Images
 * 75 motivational images from dev-dil implementation
 * Categories: Athletes, luxury lifestyle, success symbols, inspirational figures
 * 
 * Note: Using placeholder URLs for now - in production these would be:
 * 1. Local assets in the app bundle, or
 * 2. CDN URLs for the actual motivational images
 * 3. The original dev-dil images stored in cloud storage
 */

export interface InspirationImage {
	id: string;
	uri: string;
	category: 'athlete' | 'luxury' | 'success' | 'inspiration';
	description?: string;
}

export const VISUAL_INSPIRATION_IMAGES: InspirationImage[] = [
	// Athletes & Fighters (UFC, Boxing, etc.)
	{ id: 'athlete_001', uri: 'https://picsum.photos/400/400?random=1', category: 'athlete', description: 'UFC fighter motivation' },
	{ id: 'athlete_002', uri: 'https://picsum.photos/400/400?random=2', category: 'athlete', description: 'Boxing champion' },
	{ id: 'athlete_003', uri: 'https://picsum.photos/400/400?random=3', category: 'athlete', description: 'MMA training' },
	{ id: 'athlete_004', uri: 'https://picsum.photos/400/400?random=4', category: 'athlete', description: 'Fighter mentality' },
	{ id: 'athlete_005', uri: 'https://picsum.photos/400/400?random=5', category: 'athlete', description: 'Combat sports' },
	{ id: 'athlete_006', uri: 'https://picsum.photos/400/400?random=6', category: 'athlete', description: 'Athletic performance' },
	{ id: 'athlete_007', uri: 'https://picsum.photos/400/400?random=7', category: 'athlete', description: 'Training dedication' },
	{ id: 'athlete_008', uri: 'https://picsum.photos/400/400?random=8', category: 'athlete', description: 'Victory mindset' },
	{ id: 'athlete_009', uri: 'https://picsum.photos/400/400?random=9', category: 'athlete', description: 'Physical excellence' },
	{ id: 'athlete_010', uri: 'https://picsum.photos/400/400?random=10', category: 'athlete', description: 'Champion spirit' },
	{ id: 'athlete_011', uri: 'https://picsum.photos/400/400?random=11', category: 'athlete', description: 'Warrior mentality' },
	{ id: 'athlete_012', uri: 'https://picsum.photos/400/400?random=12', category: 'athlete', description: 'Fight preparation' },
	{ id: 'athlete_013', uri: 'https://picsum.photos/400/400?random=13', category: 'athlete', description: 'Strength training' },
	{ id: 'athlete_014', uri: 'https://picsum.photos/400/400?random=14', category: 'athlete', description: 'Mental toughness' },
	{ id: 'athlete_015', uri: 'https://picsum.photos/400/400?random=15', category: 'athlete', description: 'Elite performance' },

	// Luxury Lifestyle (Jets, Yachts, Cars)
	{ id: 'luxury_001', uri: 'https://picsum.photos/400/400?random=16', category: 'luxury', description: 'Private jet lifestyle' },
	{ id: 'luxury_002', uri: 'https://picsum.photos/400/400?random=17', category: 'luxury', description: 'Luxury yacht' },
	{ id: 'luxury_003', uri: 'https://picsum.photos/400/400?random=18', category: 'luxury', description: 'Supercar collection' },
	{ id: 'luxury_004', uri: 'https://picsum.photos/400/400?random=19', category: 'luxury', description: 'First class travel' },
	{ id: 'luxury_005', uri: 'https://picsum.photos/400/400?random=20', category: 'luxury', description: 'Exotic destinations' },
	{ id: 'luxury_006', uri: 'https://picsum.photos/400/400?random=21', category: 'luxury', description: 'High-end fashion' },
	{ id: 'luxury_007', uri: 'https://picsum.photos/400/400?random=22', category: 'luxury', description: 'Luxury watches' },
	{ id: 'luxury_008', uri: 'https://picsum.photos/400/400?random=23', category: 'luxury', description: 'Premium lifestyle' },
	{ id: 'luxury_009', uri: 'https://picsum.photos/400/400?random=24', category: 'luxury', description: 'Mansion living' },
	{ id: 'luxury_010', uri: 'https://picsum.photos/400/400?random=25', category: 'luxury', description: 'Elite experiences' },
	{ id: 'luxury_011', uri: 'https://picsum.photos/400/400?random=26', category: 'luxury', description: 'Helicopter views' },
	{ id: 'luxury_012', uri: 'https://picsum.photos/400/400?random=27', category: 'luxury', description: 'Ocean paradise' },
	{ id: 'luxury_013', uri: 'https://picsum.photos/400/400?random=28', category: 'luxury', description: 'Sports car power' },
	{ id: 'luxury_014', uri: 'https://picsum.photos/400/400?random=29', category: 'luxury', description: 'Luxury amenities' },
	{ id: 'luxury_015', uri: 'https://picsum.photos/400/400?random=30', category: 'luxury', description: 'VIP lifestyle' },

	// Success Symbols (Watches, Fashion, Properties)
	{ id: 'success_001', uri: 'https://picsum.photos/400/400?random=31', category: 'success', description: 'Rolex success' },
	{ id: 'success_002', uri: 'https://picsum.photos/400/400?random=32', category: 'success', description: 'Designer suits' },
	{ id: 'success_003', uri: 'https://picsum.photos/400/400?random=33', category: 'success', description: 'Real estate empire' },
	{ id: 'success_004', uri: 'https://picsum.photos/400/400?random=34', category: 'success', description: 'Executive office' },
	{ id: 'success_005', uri: 'https://picsum.photos/400/400?random=35', category: 'success', description: 'Business achievement' },
	{ id: 'success_006', uri: 'https://picsum.photos/400/400?random=36', category: 'success', description: 'Financial freedom' },
	{ id: 'success_007', uri: 'https://picsum.photos/400/400?random=37', category: 'success', description: 'Luxury timepieces' },
	{ id: 'success_008', uri: 'https://picsum.photos/400/400?random=38', category: 'success', description: 'Status symbols' },
	{ id: 'success_009', uri: 'https://picsum.photos/400/400?random=39', category: 'success', description: 'Wealth building' },
	{ id: 'success_010', uri: 'https://picsum.photos/400/400?random=40', category: 'success', description: 'Investment portfolio' },
	{ id: 'success_011', uri: 'https://picsum.photos/400/400?random=41', category: 'success', description: 'Entrepreneurship' },
	{ id: 'success_012', uri: 'https://picsum.photos/400/400?random=42', category: 'success', description: 'Corporate success' },
	{ id: 'success_013', uri: 'https://picsum.photos/400/400?random=43', category: 'success', description: 'Professional growth' },
	{ id: 'success_014', uri: 'https://picsum.photos/400/400?random=44', category: 'success', description: 'Leadership excellence' },
	{ id: 'success_015', uri: 'https://picsum.photos/400/400?random=45', category: 'success', description: 'Achievement mindset' },

	// Inspirational Figures & General Motivation
	{ id: 'inspiration_001', uri: 'https://picsum.photos/400/400?random=46', category: 'inspiration', description: 'Motivational leadership' },
	{ id: 'inspiration_002', uri: 'https://picsum.photos/400/400?random=47', category: 'inspiration', description: 'Personal development' },
	{ id: 'inspiration_003', uri: 'https://picsum.photos/400/400?random=48', category: 'inspiration', description: 'Goal achievement' },
	{ id: 'inspiration_004', uri: 'https://picsum.photos/400/400?random=49', category: 'inspiration', description: 'Mindset mastery' },
	{ id: 'inspiration_005', uri: 'https://picsum.photos/400/400?random=50', category: 'inspiration', description: 'Success principles' },
	{ id: 'inspiration_006', uri: 'https://picsum.photos/400/400?random=51', category: 'inspiration', description: 'Breakthrough moments' },
	{ id: 'inspiration_007', uri: 'https://picsum.photos/400/400?random=52', category: 'inspiration', description: 'Transformation journey' },
	{ id: 'inspiration_008', uri: 'https://picsum.photos/400/400?random=53', category: 'inspiration', description: 'Peak performance' },
	{ id: 'inspiration_009', uri: 'https://picsum.photos/400/400?random=54', category: 'inspiration', description: 'Vision realization' },
	{ id: 'inspiration_010', uri: 'https://picsum.photos/400/400?random=55', category: 'inspiration', description: 'Excellence pursuit' },
	{ id: 'inspiration_011', uri: 'https://picsum.photos/400/400?random=56', category: 'inspiration', description: 'Discipline mastery' },
	{ id: 'inspiration_012', uri: 'https://picsum.photos/400/400?random=57', category: 'inspiration', description: 'Mental strength' },
	{ id: 'inspiration_013', uri: 'https://picsum.photos/400/400?random=58', category: 'inspiration', description: 'Life optimization' },
	{ id: 'inspiration_014', uri: 'https://picsum.photos/400/400?random=59', category: 'inspiration', description: 'Purpose driven' },
	{ id: 'inspiration_015', uri: 'https://picsum.photos/400/400?random=60', category: 'inspiration', description: 'Legacy building' },
	{ id: 'inspiration_016', uri: 'https://picsum.photos/400/400?random=61', category: 'inspiration', description: 'Unstoppable mindset' },
	{ id: 'inspiration_017', uri: 'https://picsum.photos/400/400?random=62', category: 'inspiration', description: 'Growth mentality' },
	{ id: 'inspiration_018', uri: 'https://picsum.photos/400/400?random=63', category: 'inspiration', description: 'Winning attitude' },
	{ id: 'inspiration_019', uri: 'https://picsum.photos/400/400?random=64', category: 'inspiration', description: 'Success habits' },
	{ id: 'inspiration_020', uri: 'https://picsum.photos/400/400?random=65', category: 'inspiration', description: 'Champion thinking' },
	{ id: 'inspiration_021', uri: 'https://picsum.photos/400/400?random=66', category: 'inspiration', description: 'Power moves' },
	{ id: 'inspiration_022', uri: 'https://picsum.photos/400/400?random=67', category: 'inspiration', description: 'Elite mindset' },
	{ id: 'inspiration_023', uri: 'https://picsum.photos/400/400?random=68', category: 'inspiration', description: 'Breakthrough thinking' },
	{ id: 'inspiration_024', uri: 'https://picsum.photos/400/400?random=69', category: 'inspiration', description: 'Success visualization' },
	{ id: 'inspiration_025', uri: 'https://picsum.photos/400/400?random=70', category: 'inspiration', description: 'Limitless potential' },
	{ id: 'inspiration_026', uri: 'https://picsum.photos/400/400?random=71', category: 'inspiration', description: 'Excellence standards' },
	{ id: 'inspiration_027', uri: 'https://picsum.photos/400/400?random=72', category: 'inspiration', description: 'Achievement focus' },
	{ id: 'inspiration_028', uri: 'https://picsum.photos/400/400?random=73', category: 'inspiration', description: 'Victory celebration' },
	{ id: 'inspiration_029', uri: 'https://picsum.photos/400/400?random=74', category: 'inspiration', description: 'Success journey' },
	{ id: 'inspiration_030', uri: 'https://picsum.photos/400/400?random=75', category: 'inspiration', description: 'Ultimate achievement' }
];

/**
 * Filter images by category
 */
export const getImagesByCategory = (category: InspirationImage['category']) => {
	return VISUAL_INSPIRATION_IMAGES.filter(image => image.category === category);
};

/**
 * Get random selection of images
 */
export const getRandomImages = (count: number = 10) => {
	const shuffled = [...VISUAL_INSPIRATION_IMAGES].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};