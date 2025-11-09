export default function RulebookText() {
  return <section id="rulebook">
    <h1>How to Play Yut Nori (윷놀이)</h1>

    <p>
      Yut Nori is a traditional Korean board game played with four wooden sticks called <strong>yut</strong>. 
      It's usually played during holidays like Lunar New Year, but you can play anytime. 
      The goal is simple: move all of your pieces around the board before the other team does.
    </p>

    <h2>What You Need</h2>
    <ul>
      <li>4 yut sticks (or use our online version!)</li>
      <li>A yut board with a circular path</li>
      <li>2 teams (each team has 4 pieces)</li>
    </ul>

    <h2>How the Sticks Work</h2>
    <p>Throw the 4 sticks. The way they land determines how many spaces you move:</p>

    <table>
      <thead>
        <tr><th>Throw Name</th><th>Move</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Do</strong> (도)</td><td>1 space</td><td>One stick flat</td></tr>
        <tr><td><strong>Gae</strong> (개)</td><td>2 spaces</td><td>Two flat</td></tr>
        <tr><td><strong>Geol</strong> (걸)</td><td>3 spaces</td><td>Three flat</td></tr>
        <tr><td><strong>Yut</strong> (윷)</td><td>4 spaces</td><td>All four flat — throw again!</td></tr>
        <tr><td><strong>Mo</strong> (모)</td><td>5 spaces</td><td>All four round — throw again!</td></tr>
        <tr><td><strong>Backdo</strong> (뒷도)</td><td>-1 space</td><td>One marked stick flat - move backward</td></tr>
        <tr><td><strong>Nak</strong> (낙)</td><td>0 space</td><td>No movement when sticks go out of bounds</td></tr>
      </tbody>
    </table>

    <p>
      If you roll Yut or Mo, you get to take the move <em>and</em> throw again. 
      So big rolls can chain together and swing the game.
    </p>

    <h2>Moving Your Pieces</h2>
    <p>
      Your pieces follow the path around the board. 
      There are shortcuts at the corners — if you land on one, you can take the faster diagonal path.
    </p>

    <h3>Stacking (합)</h3>
    <p>You can land two of your own pieces on the same spot to stack them. They move together as one.</p>

    <h3>Capturing (잡기)</h3>
    <p>If you land on your opponent’s piece, you send it back to the start and you get another turn.</p>

    <h2>Winning the Game</h2>
    <p>
      Be the first team to move <strong>all of your pieces</strong> around the board and off the finish point.
    </p>

    <h2>Simple Example Turn</h2>
    <ol>
      <li>You throw the sticks and get <strong>Geol (3)</strong>.</li>
      <li>You move one of your pieces forward 3 spaces.</li>
      <li>If you land on an enemy piece → send them back and take another throw.</li>
      <li>If you rolled Yut or Mo → take another throw automatically.</li>
    </ol>

    <h2>Tips for Beginners</h2>
    <ul>
      <li>Try to capture pieces — extra turns are powerful.</li>
      <li>Use the diagonal shortcut when possible.</li>
      <li>Stack your pieces to move faster, but don't get both captured at once.</li>
      <li>Use your bonus throws before making a move.</li>
      <li>A token on the first space can move to the finish with a roll of Backdo.</li>
    </ul>

    <h2>Play Online</h2>
    <p>
      You can play the full 3D animated version online here:
      <br/>
      <a href="https://www.yutnori.app">https://www.yutnori.app</a>
    </p>
  </section>
}