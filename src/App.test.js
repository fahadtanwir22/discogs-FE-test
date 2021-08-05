import { render, screen } from '@testing-library/react';
import App from './App';
import Record from './components/Record'
import { fireEvent } from '@testing-library/react';

jest.mock('./components/Record');

describe("Tests for App", () => {
  test('Sould Render the App', () => {
    render(<App />);
    const linkElement = screen.getByText('Releases from R&S Records');
    expect(linkElement).toBeInTheDocument();
  });
  test("Should Render Record Component with title", () => {
    Record.mockImplementation(() => <div>Releases from R&S Records</div>);
    render(
      <Record/>
    );
    expect(screen.getByText("Releases from R&S Records")).toBeInTheDocument();
  });
  
  it('DropDown click functionality', async () => {
    const { getByText } = render( <App/>)
    const button = getByText('Sort By Year,A-Z')
    await fireEvent.click(button)
    expect(button).toHaveTextContent('Sort By Year,A-Z')
  })
});




