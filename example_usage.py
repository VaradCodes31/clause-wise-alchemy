
import json
from contract_analyzer import process_document

# Example of how to use the contract analyzer in your own Python code
def example_usage():
    # Process a contract document
    results = process_document("path/to/your/contract.pdf")
    
    # Print the overall contract information
    print(f"Contract: {results['contract_title']}")
    print(f"Number of clauses analyzed: {len(results['analysis'])}")
    
    # Print high-risk clauses
    high_risk_clauses = [clause for clause in results['analysis'] if clause['risk_level'] == 'high']
    print(f"\nHigh Risk Clauses: {len(high_risk_clauses)}")
    
    for clause in high_risk_clauses:
        print(f"\n- {clause['clause_title']}")
        
        # Print edit suggestions
        if clause['edit_suggestions']:
            print("  Suggested Edits:")
            for suggestion in clause['edit_suggestions']:
                print(f"  • {suggestion['reasoning']}")
                print(f"    Suggestion: {suggestion['suggested'][:100]}...")
        
        # Print counterparty arguments
        if clause['counterparty_arguments']:
            print("  Possible Counterparty Arguments:")
            for arg in clause['counterparty_arguments']:
                print(f"  • {arg['argument']} (Strength: {arg['strength']})")
    
    # Save the full analysis to a file
    with open("detailed_analysis.json", "w") as f:
        json.dump(results, f, indent=2)
    print("\nFull analysis saved to detailed_analysis.json")

if __name__ == "__main__":
    example_usage()
