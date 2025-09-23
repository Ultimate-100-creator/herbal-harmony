
import type { Product, Review } from './types';

export const products: Product[] = [
  {
    id: 11,
    name: 'Ginja Bull',
    type: 'Extra Support',
    details: '500000MCG • Extra Support • Preserving',
    rating: 4.8,
    reviewCount: 1054,
    price: 16000.00,
    originalPrice: 17500.00,
    imageUrls: [
      '/images/products/Ginja Bull.png',
      'https://images.unsplash.com/photo-1596706385906-e87515409153?q=80&w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1620340222446-208a0a454238?q=80&w=800&h=800&fit=crop',
    ],
    longDescription: `<p><strong>Indication:</strong> Erectile Dysfunction, quick ejaculation.</p>
      <p class="mt-2">Sexual health is an important part of a man's life, no matter his age, civil status, or sexual orientation. It is also an important part of a man's overall health, and therefore it is important for a man to discuss these issues with a qualified health professional. Sexual activities involve coordination between various systems of the body. Hormones and neurological pathways must be in sync for sexual desires to be present. Blood vessels, nerves, and penile integrity must all be present for an adequate reaction and its maintenance during the sexual relation. Muscles and nerves coordinate ejaculation achieved when the physiological passageways for sperm (from the testicles to the urethra) are present. Orgasm is a complex phenomenon that isn't completely understood but it involves the coordination of muscles and nerves. Erectile dysfunction will cause the penis to be unable to acquire or maintain a satisfactory erection. The quality of an erection can be judged according to the rigidity and the functionality (is the penis erect enough to allow for vaginal penetration?).</p>
      <h4 class="font-semibold mt-4 mb-2">Risk factors for erectile dysfunction include:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Obesity</li>
        <li>Aging</li>
        <li>Smoking</li>
        <li>Diabetes</li>
        <li>High blood pressure</li>
        <li>High cholesterol</li>
        <li>Cardiovascular disease</li>
        <li>Medication use</li>
        <li>Obstructive sleep apnea</li>
        <li>Restless leg syndrome</li>
        <li>Systemic sclerosis (scleroderma)</li>
        <li>Peyronie's disease</li>
        <li>Prostate cancer treatment</li>
      </ul>
      <p class="mt-4">Premature ejaculation is the most common of the ejaculatory disorders; approximately 20% to 30% of men will have premature ejaculation. Libido is mainly a hormonal and brain phenomenon. Sexual desires require a normal level of testosterone (male hormone) in the blood and a certain attraction of the partner in question.</p>
      <p class="mt-4">GINJABULL is a well-researched and formulated supplement composed of 4 herbs produced under a hygienic condition and GMP (Good Manufacturing Practice). This is a formulation recommended by pharmacists and pharmacognosists alike.</p>

      <h4 class="font-semibold mt-4 mb-2">Key Ingredients:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li><strong>Tribulus terrestris (175mg):</strong> May help increase testosterone levels, reduce cholesterol levels, reduce triglycerides, has antioxidant properties, and reduces serum glucose levels. Tribulus may increase testosterone levels indirectly by raising high blood levels of another hormone, luteinizing hormone (LH).</li>
        <li><strong>Anthocleista djalonensis (100mg):</strong> Excessive production of free radicals or reactive oxygen species (ROS) can damage sperm and ROS have been extensively studied as one of the mechanisms of infertility. Superoxide anion, hydroxyl radical and hydrogen peroxide are some of the major ROS present in seminal plasma. Cells living under aerobic conditions constantly face the oxygen (O2) paradox - O2 is required to support life, but its metabolism such as ROS can modify cell functions, endanger cell survival, or both; hence, any excessive ROS must be continuously inactivated in order to maintain normal cell functions. This function is taken up by the antioxidants present in the seminal plasma. When there is an excessive production of ROS or impaired antioxidant defense mechanism, oxidative stress (OS) occurs, which is harmful to spermatozoa.</li>
        <li><strong>Sphenocentrum jollyanum (125mg):</strong> S. jollyanum relaxes vascular and cavernosal smooth muscles thus providing evidence of its mechanism of action in the management of ED. The extract exhibited a relatively more potent effect on the cavernosal smooth muscles compared to vascular smooth muscle. This is very important because it indicates the concentration required for enhancing an erection is unlikely to cause any significant hypertensive side effect.</li>
        <li><strong>Zingiber officinale (100mg):</strong> Zingiber officinale shows effective glycaemic control properties on diabetes mellitus. The prominent lipid-lowering effects of ginger also contribute to improving the insulin-resistant condition. The protective effect of ginger against diabetic complications is also an important aspect of its benefit in preventing erectile dysfunction and decreased libido in male diabetics.</li>
      </ul>

      <h4 class="font-semibold mt-4 mb-2">Dosage:</h4>
      <p>Two capsules to be taken 1 hour before anticipated intercourse or 1 capsule twice daily for restorative benefits.</p>
      <p class="mt-2 text-sm"><em>Result may vary with individuals. If you are on any medications, consult a medical professional before taking this product. No known side effects.</em></p>

      <hr class="my-8">

      <h3 class="text-2xl font-bold mb-4">Reclaim Your Health Today!</h3>
      <p>Are you ready to take control of your prostate health and boost your fertility? Introducing Ginjabull, the revolutionary supplement designed to provide comprehensive support for men’s well-being. With its powerful blend of natural ingredients, Ginjabull is your go-to solution for maintaining a healthy prostate and enhancing reproductive health.</p>

      <h4 class="font-semibold mt-4 mb-2">Why choose Ginjabull?</h4>
      <ol class="list-decimal list-inside space-y-2">
        <li><strong>Advanced Prostate Support:</strong> Ginjabull is crafted with a unique combination of scientifically backed ingredients to promote optimal prostate function.</li>
        <li><strong>Fertility Boosting Benefits:</strong> In addition to prostate support, Ginjabull is designed to enhance male fertility.</li>
        <li><strong>Natural and Safe:</strong> Ginjabull is made with high-quality, natural ingredients that are carefully selected for their safety and efficacy. Our formula is designed to be well-tolerated by most individuals, ensuring you get the benefits you need without unwanted side effects.</li>
        <li><strong>Easy to Use:</strong> Integrating Ginjabull into your daily routine is simple. Just take two capsules daily with meals, and let the powerful ingredients work their magic. For best results, consistency is key.</li>
      </ol>

      <p class="mt-4">Don’t let prostate issues or fertility concerns hold you back. With Ginjabull, you can take a proactive step towards better health and improved quality of life. Feel more confident, comfortable, and vibrant inside and out.</p>
      <p class="mt-4">Order Ginjabull now and experience the difference for yourself! For a limited time, enjoy special offers and discounts on your first purchase. Visit our website or Instagram page @Supplementiarx to learn more.</p>

      <p class="mt-4 font-bold">Ginjabull: Because your health deserves the best.</p>
      <p>Take control. Embrace vitality. Choose Ginjabull today.</p>`,
  },
  {
    id: 1,
    name: 'Serenity Root',
    type: 'Calming Tincture',
    details: 'Valerian • 50ml • Organic',
    rating: 4.6,
    reviewCount: 978,
    price: 12000.00,
    originalPrice: 15000.00,
    imageUrls: ['https://images.unsplash.com/photo-1605650230219-9c515a454238?q=80&w=800&h=800&fit=crop'],
  },
  {
    id: 2,
    name: 'Vitality Blend',
    type: 'Energy Tincture',
    details: 'Ginseng • 50ml • Non-GMO',
    rating: 4.8,
    reviewCount: 862,
    price: 14000.00,
    originalPrice: 17500.00,
    imageUrls: ['https://images.unsplash.com/photo-1596706385906-e87515409153?q=80&w=800&h=800&fit=crop'],
  },
  {
    id: 3,
    name: 'Lucid Dream',
    type: 'Sleep Aid Tincture',
    details: 'Mugwort • 30ml • Wildcrafted',
    rating: 4.5,
    reviewCount: 885,
    price: 11000.00,
    originalPrice: 14000.00,
    imageUrls: ['https://images.unsplash.com/photo-1620340222446-208a0a454238?q=80&w=800&h=800&fit=crop'],
  },
  {
    id: 4,
    name: 'Immune Guard',
    type: 'Defense Tincture',
    details: 'Echinacea • 100ml • Organic',
    rating: 4.7,
    reviewCount: 863,
    price: 18000.00,
    originalPrice: 22000.00,
    imageUrls: ['https://images.unsplash.com/photo-1610011037434-a6983578b943?q=80&w=800&h=800&fit=crop'],
  },
  {
    id: 5,
    name: 'Focus Flow',
    type: 'Cognitive Tincture',
    details: 'Ginkgo Biloba • 50ml • Organic',
    rating: 4.6,
    reviewCount: 882,
    price: 15000.00,
    originalPrice: 18000.00,
    imageUrls: ['https://images.unsplash.com/photo-1600322369586-31a89a057e4e?q=80&w=800&h=800&fit=crop'],
  },
  {
    id: 6,
    name: 'Golden Spice',
    type: 'Anti-Inflammatory',
    details: 'Turmeric • 100ml • Non-GMO',
    rating: 4.8,
    reviewCount: 867,
    price: 13000.00,
    originalPrice: 16500.00,
    imageUrls: ['https://images.unsplash.com/photo-1627833054817-38875c2e35f4?q=80&w=800&h=800&fit=crop'],
  },
  {
    id: 7,
    name: 'Heartfelt',
    type: 'Cardio Support',
    details: 'Hawthorn Berry • 50ml • Organic',
    rating: 4.6,
    reviewCount: 869,
    price: 14500.00,
    originalPrice: 17000.00,
    imageUrls: ['https://images.unsplash.com/photo-1615725797378-f6a84793e273?q=80&w=800&h=800&fit=crop'],
  },
  {
    id: 8,
    name: 'Deep Breath',
    type: 'Respiratory Tincture',
    details: 'Mullein • 50ml • Wildcrafted',
    rating: 4.7,
    reviewCount: 855,
    price: 13500.00,
    originalPrice: 16500.00,
    imageUrls: ['https://images.unsplash.com/photo-1606804264332-2780b43f993d?q=80&w=800&h=800&fit=crop'],
  },
    {
    id: 9,
    name: 'Digest Ease',
    type: 'Stomach Soother',
    details: 'Ginger • 50ml • Organic',
    rating: 4.9,
    reviewCount: 1021,
    price: 11500.00,
    originalPrice: 14500.00,
    imageUrls: ['https://images.unsplash.com/photo-1598514983318-78207137b084?q=80&w=800&h=800&fit=crop'],
  },
  {
    id: 10,
    name: 'Lion\'s Mane Elixir',
    type: 'Focus Tincture',
    details: 'Mushroom • 30ml • Organic',
    rating: 4.8,
    reviewCount: 954,
    price: 19000.00,
    originalPrice: 23000.00,
    imageUrls: ['https://images.unsplash.com/photo-1618193138875-293b16a2b25c?q=80&w=800&h=800&fit=crop'],
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    author: 'Isaiah B.',
    initial: 'I',
    date: 'Purchased on April 7, 2025',
    rating: 5,
    comment: 'I rate this 5 stars because I\'m super impressed with supplentiarx, and their certified organic products. It meant it when it said excellent, there were no issues, and an extra bonus was it came with a little guide on uses. I\'ve never bought tinctures online before but I feel proud to be apart of back market in helping the world, even though I didn\'t get the experience of walking into an apothecary it still feels like I did, so Thanks to all of you that made this possible for me and everyone else, I really appreciate it!',
    images: [
      'https://picsum.photos/seed/review1a/200/200',
      'https://picsum.photos/seed/review1b/200/200',
      'https://picsum.photos/seed/review1c/200/200',
    ],
    item: {
      name: 'Ginja Bull',
      details: '500000MCG • Extra Support • Preserving',
      imageUrl: '/images/products/Ginja Bull.png',
    },
    condition: 'Excellent',
    reviewDate: 'Reviewed in Nigeria on April 12, 2025'
  },
  {
    id: 2,
    author: 'Liza G.',
    initial: 'L',
    date: 'Purchased on January 9, 2025',
    rating: 4,
    comment: 'The Vitality Blend really works! I have much more energy throughout the day. The taste is a bit strong, but you get used to it. Packaging was secure and delivery was prompt. I would recommend this for anyone needing a natural boost.',
    images: [],
    item: {
      name: 'Vitality Blend',
      details: 'Ginseng • 50ml • Non-GMO',
      imageUrl: 'https://images.unsplash.com/photo-1596706385906-e87515409153?q=80&w=800&h=800&fit=crop', // Note: This is a single URL
    },
    condition: 'Excellent',
    reviewDate: 'Reviewed in Nigeria on January 15, 2025'
  }
];
