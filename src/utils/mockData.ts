
import { Clause, Contract, EditSuggestion, CounterPartyArgument, LegalReference } from './types';

export const mockContract: Contract = {
  id: '1',
  title: 'Software Licensing Agreement',
  parties: ['Acme Corp (Licensor)', 'TechStart Inc. (Licensee)'],
  clauses: [
    {
      id: 'c1',
      title: 'License Grant',
      type: 'License',
      content: 'Licensor hereby grants to Licensee a non-exclusive, non-transferable, revocable license to use the Software solely for internal business purposes. Licensee may not sublicense, sell, lease, or otherwise transfer the Software to any third party.',
      risk: 'low'
    },
    {
      id: 'c2',
      title: 'Limitation of Liability',
      type: 'Liability',
      content: 'In no event shall Licensor be liable for any indirect, incidental, special, exemplary, or consequential damages, however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of the Software, even if advised of the possibility of such damage.',
      risk: 'high'
    },
    {
      id: 'c3',
      title: 'Indemnification',
      type: 'Indemnity',
      content: 'Licensee shall indemnify, defend, and hold harmless Licensor against any claims, damages, and expenses (including reasonable attorneys\' fees) arising from or related to Licensee\'s use of the Software or breach of this Agreement.',
      risk: 'medium'
    },
    {
      id: 'c4',
      title: 'Term and Termination',
      type: 'Termination',
      content: 'This Agreement shall remain in effect until terminated. Licensor may terminate this Agreement immediately and without notice if Licensee breaches any provision of this Agreement. Upon termination, Licensee must cease all use of the Software and destroy all copies.',
      risk: 'high'
    },
    {
      id: 'c5',
      title: 'Intellectual Property',
      type: 'IP Rights',
      content: 'All title, ownership rights, and intellectual property rights in and to the Software shall remain with Licensor. Licensee acknowledges that no title to the intellectual property in the Software is transferred to Licensee.',
      risk: 'low'
    }
  ]
};

export const mockEditSuggestions: EditSuggestion[] = [
  {
    id: 'e1',
    clauseId: 'c2',
    original: 'In no event shall Licensor be liable for any indirect, incidental, special, exemplary, or consequential damages, however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of the Software, even if advised of the possibility of such damage.',
    suggested: 'In no event shall Licensor be liable for any indirect, incidental, special, exemplary, or consequential damages, however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of the Software, even if advised of the possibility of such damage. Licensor's total liability for all claims related to this Agreement shall not exceed the amounts paid by Licensee to Licensor under this Agreement in the twelve (12) months preceding the claim.',
    reasoning: 'The current clause completely eliminates all liability for the Licensor without any cap on liability, which courts often find unenforceable.',
    impact: 'Adding a liability cap provides some protection for the Licensee while still limiting Licensor's overall exposure to a reasonable amount.'
  },
  {
    id: 'e2',
    clauseId: 'c4',
    original: 'This Agreement shall remain in effect until terminated. Licensor may terminate this Agreement immediately and without notice if Licensee breaches any provision of this Agreement. Upon termination, Licensee must cease all use of the Software and destroy all copies.',
    suggested: 'This Agreement shall remain in effect until terminated. Licensor may terminate this Agreement with thirty (30) days written notice if Licensee breaches any material provision of this Agreement and fails to cure such breach within the notice period. Upon termination, Licensee must cease all use of the Software and destroy all copies.',
    reasoning: 'The original clause allows immediate termination without notice for any breach, no matter how minor, which is highly unfavorable to the Licensee.',
    impact: 'Adding a notice period and cure rights allows the Licensee time to address issues before losing access to potentially critical software.'
  }
];

export const mockCounterpartyArguments: CounterPartyArgument[] = [
  {
    id: 'cp1',
    clauseId: 'c2',
    argument: 'The unlimited limitation of liability clause is unbalanced and potentially unenforceable in many jurisdictions. We propose adding mutual limitations and excluding liability caps for certain scenarios such as breaches of confidentiality, IP infringement, and gross negligence.',
    strength: 'strong'
  },
  {
    id: 'cp2',
    clauseId: 'c3',
    argument: 'The indemnification clause is one-sided. We suggest making it mutual so that Licensor also indemnifies Licensee against third-party claims alleging the Software infringes intellectual property rights.',
    strength: 'moderate'
  },
  {
    id: 'cp3',
    clauseId: 'c4',
    argument: 'The termination clause doesn\'t provide any opportunity to cure breaches and lacks reciprocal termination rights. We request a 30-day cure period and the ability for Licensee to terminate if Licensor materially breaches its obligations.',
    strength: 'strong'
  }
];

export const mockLegalReferences: LegalReference[] = [
  {
    id: 'lr1',
    clauseId: 'c2',
    source: 'Case Law',
    citation: 'XYZ Corp v. ABC Inc., 123 F.3d 456 (9th Cir. 2010)',
    relevance: 'Court found that unlimited liability waivers without any cap are often unenforceable as unconscionable, particularly in B2B software licenses.',
    url: 'https://example.com/case/xyz-v-abc'
  },
  {
    id: 'lr2',
    clauseId: 'c4',
    source: 'Legal Commentary',
    citation: 'Practical Law, "Software License Agreements: Key Provisions"',
    relevance: 'Standard industry practice includes notice and cure periods before termination except in extreme cases such as IP infringement.',
    url: 'https://example.com/practical-law/software-license'
  }
];
