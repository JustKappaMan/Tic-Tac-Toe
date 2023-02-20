(() => {
  const cells = document.querySelectorAll('#field div'),
    scoreBlock = document.querySelector('#score'),
    restartButton = document.querySelector('#restart');

  const areEqual = (cellOne, cellTwo, cellThree) =>
    cellOne.innerText &&
    cellTwo.innerText &&
    cellThree.innerText &&
    cellOne.innerText === cellTwo.innerText &&
    cellTwo.innerText === cellThree.innerText;

  const someoneWon = () =>
    areEqual(cells[0], cells[1], cells[2]) ||
    areEqual(cells[3], cells[4], cells[5]) ||
    areEqual(cells[6], cells[7], cells[8]) ||
    areEqual(cells[0], cells[3], cells[6]) ||
    areEqual(cells[1], cells[4], cells[7]) ||
    areEqual(cells[2], cells[5], cells[8]) ||
    areEqual(cells[0], cells[4], cells[8]) ||
    areEqual(cells[2], cells[4], cells[6]);

  const noEmptyCells = () => [...cells].every((cell) => cell.innerText);

  const randomItem = (arr) =>
    arr.splice(Math.floor(Math.random() * arr.length), 1);

  let emojis = ['❌', '⭕'];
  const playerEmoji = randomItem(emojis);
  const aiEmoji = randomItem(emojis);

  let score = 0;

  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      // Player turn
      const playerCell = document.querySelector(`#${e.target.id}`);
      playerCell.innerText = playerEmoji;
      playerCell.style.pointerEvents = 'none';

      if (someoneWon()) {
        // Block all cells, update score, show restart button
        cells.forEach((cell) => {
          cell.style.pointerEvents = 'none';
        });
        scoreBlock.innerText = `Score: ${++score}`;
        restartButton.style.visibility = 'visible';
        return;
      } else if (noEmptyCells()) {
        // Block all cells, show restart button
        cells.forEach((cell) => {
          cell.style.pointerEvents = 'none';
        });
        restartButton.style.visibility = 'visible';
        return;
      }

      // AI turn
      if (!noEmptyCells()) {
        let aiCell = cells[Math.floor(Math.random() * 9)];

        while (aiCell.innerText) {
          aiCell = cells[Math.floor(Math.random() * 9)];
        }

        aiCell.innerText = aiEmoji;
        aiCell.style.pointerEvents = 'none';

        if (someoneWon()) {
          // Block all cells, update score, show restart button
          cells.forEach((cell) => {
            cell.style.pointerEvents = 'none';
          });
          scoreBlock.innerText =
            score === 0 ? `Score: ${score}` : `Score: ${--score}`;
          restartButton.style.visibility = 'visible';
        }
      }
    });
  });

  restartButton.addEventListener('click', () => {
    // Clear and unblock all cells, hide restart button
    cells.forEach((cell) => {
      cell.innerText = '';
      cell.style.pointerEvents = 'auto';
    });
    restartButton.style.visibility = 'hidden';
  });
})();
