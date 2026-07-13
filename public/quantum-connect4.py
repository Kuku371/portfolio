import tkinter as tk
import turtle
import random
import time
import math

# -------- Configuration variables(Properties, Global Values) --------
COLS, ROWS = 8, 8
TILE = 60
PILE_COUNTS = {1.0: 12, 0.75: 14, 0.5: 6}
PROBS = [[1.0, 0], [0.75, 0.25], [0.5, 0.5]]
PLAYER_COLORS = ["red", "yellow"]
placed_coins = [[], [], [], [], [], [], []]  #5 is yellow heavy, 6 is red heavy
move_count = 0
mode = 0
entangled_index = 1
non_entangled_coins = []
entangled_coins = []
gated_columns = []
board = [[None for _ in range(COLS)] for _ in range(ROWS)]
piles = {
    color: {
        p[0]: PILE_COUNTS[p[0]]
        for p in PROBS
    }
    for color in PLAYER_COLORS
}
turn = "red"
selected_prob = 1.0
tutorial_slide = 0
tutorial_texts = [
    [
        "Welcome to Superposition Mode!",
        "Each coin is a superposition of red and yellow. This is represented visually by the arcs of the circles and by the vectors describing them. You have a limited number of each type of coin.",
        "After the game, superposition coins will be measured one-by-one so that they either collapse to red or to yellow. If it's state is [a,b], then the probability it collapses to your color is a\u00b2 and the probability it collapses to the opponent's color is b\u00b2. Coins collapse left to right, bottom to top until there is a winner.",
        "To play a move, select the coin you would like to play and then click on the column you would like to place it in. If no winner is declared after all coins are placed, the game will automatically start collapsing coins."
    ],
    [
        "Welcome to Entanglement Mode!",
        "Each coin is a superposition of red and yellow. This is represented visually by the arcs of the circles and by the vectors describing them. You have a limited number of each type of coin.",
        "After the game, superposition coins will be measured one-by-one so that they either collapse to red or to yellow. If it's state is [a,b], then the probability it collapses to your color is a\u00b2 and the probability it collapses to the opponent's color is b\u00b2. Coins collapse left to right, bottom to top until there is a winner.",
        "To play a move, select the coin you would like to play and then click on the column you would like to place it in. If no winner is declared after all coins are placed, the game will automatically start collapsing coins.",
        "Sometimes you may place a quantum state coin that is entangled with another coin, represented by a number on both coins. Whichever one collapses first will determine the state of both coins simultaneously."
    ],
    [
        "Welcome to Quantum Gates!",
        "Each coin is a superposition of red and yellow. This is represented visually by the arcs of the circles and by the vectors describing them. You have a limited number of each type of coin.",
        "After the game, superposition coins will be measured one-by-one so that they either collapse to red or to yellow. If it's state is [a,b], then the probability it collapses to your color is a\u00b2 and the probability it collapses to the opponent's color is b\u00b2. Coins collapse left to right, bottom to top until there is a winner.",
        "To play a move, select the coin you would like to play and then click on the column you would like to place it in. If no winner is declared after all coins are placed, the game will automatically start collapsing coins.",
        "Sometimes you may place a quantum state coin that is entangled with another coin, represented by a number on both coins. Whichever one collapses first will determine the state of both coins simultaneously.",
        "In this mode some of your columns will contain quantum games listed at the bottom, which are either Pauli-X(X) or Hadamard(H) gates. Each of these gates acts as a linear transformation on the quantum state of the coin you place in that column. \n\nThe Pauli-X gate is given by the matrix [[0,1],[1,0]] and the Hadamard gate is given by the matrix [[1/\u221a2,1/\u221a2],[1/\u221a2,-1/\u221a2]]. If the vector you are transforming is v and the gate is G, then the new vector will by the matrix multiplication Gv."
    ]
]

# -------- Tkinter Front Page for Launch --------
root = None

def launch_main_menu():
    global root
    root = tk.Tk()
    root.geometry("800x600")
    root.title("Quantum Connect 4")

    create_main_menu_content()
    root.mainloop()

def create_main_menu_content():
    global root
    title = tk.Label(root,
                     text="Quantum Connect 4",
                     font=("Helvetica", 32, "bold"),
                     fg="darkblue")
    title.pack(pady=50)

    start_btn_1 = tk.Button(
        root,
        text="\u25b6 Start Game(Level 1)",
        font=("Helvetica", 18),
        bg="blue",
        fg="white",
        command=lambda: [root.destroy(), launch_game()])
    start_btn_1.pack(pady=10)

    start_btn_2 = tk.Button(
        root,
        text="\u25b6 Start Game(Level 2)",
        font=("Helvetica", 18),
        bg="blue",
        fg="white",
        command=lambda: [root.destroy(), launch_game(True)])
    start_btn_2.pack(pady=10)

    start_btn_3 = tk.Button(
        root,
        text="\u25b6 Start Game(Level 3)",
        font=("Helvetica", 18),
        bg="blue",
        fg="white",
        command=lambda: [root.destroy(),
                         launch_game(True, True)])
    start_btn_3.pack(pady=10)

    backstory_btn = tk.Button(root,
                              text="\u2139\ufe0f Credits",
                              font=("Helvetica", 18),
                              bg="gray20",
                              fg="white",
                              command=show_backstory)
    backstory_btn.pack(pady=20)


def show_backstory():
    for widget in root.winfo_children():
        widget.destroy()

    title = tk.Label(root,
                     text="Credits & Info",
                     font=("Helvetica", 32, "bold"),
                     fg="darkblue")
    title.pack(pady=50)

    credits_text = (
        "Quantum Connect 4\n\n"
        "A quantum twist on the classic Connect 4 game\n"
        "where coins exist in superposition until measured.\n\n"
        "Game Features:\n"
        "\u2022 Superposition coins with quantum probabilities\n"
        "\u2022 Entanglement between quantum states\n"
        "\u2022 Quantum gates (Pauli-X and Hadamard)\n\n"
        "Created with Python, Tkinter, and Turtle Graphics"
    )

    label = tk.Label(root,
                     text=credits_text,
                     font=("Arial", 14),
                     padx=20,
                     pady=20,
                     justify="center")
    label.pack(expand=True)

    def return_to_menu():
        for widget in root.winfo_children():
            widget.destroy()
        create_main_menu_content()

    back_btn = tk.Button(root,
                        text="\u25c0 Back to Main Menu",
                        font=("Arial", 16),
                        bg="blue",
                        fg="white",
                        command=return_to_menu)
    back_btn.pack(pady=20)


# -------- Turtle Configuration --------

screen = None
pen = None
tutorial_canvas = None


def launch_game(entanglement=False, gates=False):
    global screen, pen, tutorial_canvas, mode, gated_columns
    root = tk.Tk()
    #root.attributes('-fullscreen', True)
    root.title("Quantum Connect 4")

    canvas_frame = tk.Frame(root)
    canvas_frame.pack()

    tutorial_canvas = tk.Canvas(canvas_frame,
                                width=500,
                                height=800,
                                bg="lightgray")
    tutorial_canvas.pack(side=tk.LEFT)

    if gates:
        mode = 2
        for column in range(8):
            random_num = random.randint(0, 1000)
            if random_num < 300:
                gated_columns.append([column, "X"])
            elif random_num < 500:
                gated_columns.append([column, "H"])
    elif entanglement:
        mode = 1
    else:
        mode = 0
    draw_tutorial_slide()

    turtle_canvas = tk.Canvas(canvas_frame, width=1200, height=800)
    turtle_canvas.pack(side=tk.RIGHT)

    screen = turtle.TurtleScreen(turtle_canvas)
    screen.setworldcoordinates(0, 0, 1200, 800)
    screen.bgcolor("#111122")

    pen_obj = turtle.RawTurtle(screen)
    pen_obj.hideturtle()
    pen_obj.speed(0)
    pen_obj.penup()
    global pen
    pen = pen_obj

    draw_board()
    screen.onclick(handle_click)
    screen.listen()

    def toggle_fullscreen(event=None):
        pass

    root.bind('<Escape>', toggle_fullscreen)
    root.mainloop()


# -------- Tutorial Slides --------


def draw_tutorial_slide():
    global mode, tutorial_slide
    tutorial_canvas.delete("all")
    tutorial_canvas.create_text(250,
                                300,
                                text=tutorial_texts[mode][tutorial_slide],
                                width=400,
                                font=("Arial", 16),
                                fill="black")

    prev_btn = tk.Button(tutorial_canvas,
                         text="\u25c0 Back",
                         command=lambda: prev_slide())
    tutorial_canvas.create_window(100, 600, window=prev_btn)

    next_btn = tk.Button(tutorial_canvas,
                         text="Next \u25b6",
                         command=lambda: next_slide())
    tutorial_canvas.create_window(350, 600, window=next_btn)


def next_slide():
    global tutorial_slide, mode
    tutorial_slide = (tutorial_slide + 1) % len(tutorial_texts[mode])
    draw_tutorial_slide()


def prev_slide():
    global tutorial_slide, mode
    tutorial_slide = (tutorial_slide - 1) % len(tutorial_texts[mode])
    draw_tutorial_slide()


# -------- Turtle Drawing Functions --------


def draw_column_vector(pen,
                       x,
                       y,
                       vec,
                       height=50,
                       font=("Arial", 12, "normal")):

    w = height * 0.6
    h = height / 2
    pen.penup()
    pen.setheading(0)
    pen.goto(x, y)
    pen.pendown()
    pen.forward(5)
    pen.backward(5)
    pen.left(90)
    pen.forward(height)
    pen.right(90)
    pen.forward(5)

    pen.penup()
    pen.goto(x + w, y)
    pen.pendown()
    pen.backward(5)
    pen.forward(5)
    pen.left(90)
    pen.forward(height)
    pen.right(90)
    pen.backward(5)

    for i in range(2):
        pen.penup()
        pen.goto(x + w / 2 - 10,
                 y + h * (1.3 - i))
        pen.pendown()
        pen.write(f"{round(math.sqrt(vec[i]), 2):.2f}",
                  font=("Arial", 8, "normal"))

    pen.setheading(0)
    pen.penup()


def draw_grid():
    pen.color("white")
    pen.pensize(2)
    for r in range(ROWS + 1):
        pen.penup()
        pen.goto(50, 150 + r * TILE)
        pen.pendown()
        pen.goto(50 + COLS * TILE, 150 + r * TILE)
    for c in range(COLS + 1):
        pen.penup()
        pen.goto(50 + c * TILE, 150)
        pen.pendown()
        pen.goto(50 + c * TILE, 150 + ROWS * TILE)
    pen.penup()


def draw_entangled_number(x, y, num):
    pen.color("blue")
    pen.penup()
    pen.goto(x, y)
    pen.pendown()
    pen.write(f"{num}", font=("Arial", 12, "bold"))


def draw_token(x, y, color, prob, radius=25, fills=True):
    other = "yellow" if color == "red" else "red"

    pen.goto(x + radius, y)
    pen.setheading(90)
    pen.color(color)
    pen.pensize(10)
    if fills:
        pen.fillcolor(color)
        pen.begin_fill()
    pen.circle(radius, extent=prob * 360)
    pen.goto(x, y)
    if fills:
        pen.end_fill()

    pen.goto(x - 3 * radius + 4 * prob * radius,
             y - (0.25 - abs(prob - 0.75)) * radius * 4)
    pen.setheading(90 + prob * 360)
    if fills:
        pen.fillcolor(other)
        pen.begin_fill()
    pen.circle(radius, extent=(1 - prob) * 360)
    pen.goto(x, y)
    if fills:
        pen.end_fill()
    pen.pensize(2)

    pen.color("white")
    pen.goto(x + 30, y - 10)


def draw_board():
    pen.clear()
    draw_grid()
    for r in range(ROWS):
        for c in range(COLS):
            token = board[r][c]
            if token:
                x = 50 + c * TILE + TILE // 2
                y = 150 + r * TILE + TILE // 2
                draw_token(x, y, *token)
    for el in entangled_coins:
        x = 50 + el[1] * TILE + TILE // 2
        y = 150 + el[0] * TILE + TILE // 2
        draw_entangled_number(x, y, el[2])
    for el in gated_columns:
        pen.penup()
        pen.color("white")
        pen.goto(50 + el[0] * TILE + TILE // 2 - 3, 130)
        pen.write(f"{el[1]}", font=("Arial", 12, "bold"))
        pen.penup()
    draw_piles()


def draw_piles():
    pen.color("red" if turn == "red" else "gold")
    pen.goto(50, 650)
    pen.write(f"{turn.capitalize()}'s Turn", font=("Arial", 18, "bold"))

    base_x = 600
    base_y = 530
    for i, p in enumerate(PROBS):
        pen.color("lightgreen" if p[0] == selected_prob else "white")
        pen.color("lightgreen" if p[0] == selected_prob else "white")
        pen.setheading(0)
        pen.penup()
        pen.goto(base_x - 15, base_y - i * 100 - 40)
        pen.pendown()
        pen.begin_fill()
        pen.forward(120)
        pen.left(90)
        pen.forward(80)
        pen.left(90)
        pen.forward(120)
        pen.left(90)
        pen.forward(80)
        pen.end_fill()
        pen.penup()
        pen.color("red" if turn == "red" else "gold")
        pen.goto(base_x, base_y - i * 100)
        draw_token(pen.pos()[0] + 15, pen.pos()[1], turn, p[0], 15)
        pen.goto(base_x + 40, base_y - i * 100 - 25)
        pen.color("black")
        draw_column_vector(pen, pen.pos()[0], pen.pos()[1], p)
        pen.goto(base_x + 75, base_y - i * 100)
        pen.write(f": {piles[turn][p[0]]}")


def game_over(winner):
    global tutorial_canvas
    tutorial_canvas.delete("all")

    if winner == "redyellow" or winner == "":
        message = "It's a Draw!"
    else:
        message = f"{winner.capitalize()} Wins!"

    tutorial_canvas.create_text(250, 300,
                               text=message,
                               width=400,
                               font=("Arial", 30, "bold"),
                               fill="darkblue")

    def return_to_menu():
        tutorial_canvas.master.master.destroy()
        launch_main_menu()

    back_btn = tk.Button(tutorial_canvas,
                        text="\u25c0 Back to Main Menu",
                        font=("Arial", 16),
                        bg="blue",
                        fg="white",
                        command=return_to_menu)
    tutorial_canvas.create_window(250, 400, window=back_btn)


# -------- Game Logic and Clicking --------
def find_empty_row(col):
    for r in range(ROWS):
        if board[r][col] is None:
            return r
    return None


def handle_click(x, y):
    global turn, selected_prob, move_count, entangled_index

    base_x = 585
    base_y = 570
    btn_w, btn_h = 120, 80

    for i, p in enumerate(PROBS):
        x1, y1 = base_x, base_y - i * 100
        x2, y2 = x1 + btn_w, y1 - btn_h
        if x1 <= x <= x2 and y2 <= y <= y1:
            selected_prob = p[0]
            draw_board()
            return

    left_x, right_x = 50, 50 + COLS * TILE
    bottom_y, top_y = 150, 150 + ROWS * TILE
    if not (left_x <= x <= right_x and bottom_y <= y <= top_y):
        return

    col = int((x - 50) // TILE)
    row = find_empty_row(col)
    if row is None:
        return

    if piles[turn][selected_prob] <= 0:
        return

    piles[turn][selected_prob] -= 1
    move_count += 1
    if mode == 2 and [col, "X"] in gated_columns:
        placed_coins[int(4 - 4 * selected_prob) if turn ==
         "red" else int(4 * selected_prob)].append([row, col])
        board[row][col] = ("red" if turn=="yellow" else "yellow", selected_prob)
    elif mode==2 and [col, "H"] in gated_columns:
        if selected_prob==1.0:
            board[row][col] = (turn, 0.5)
            placed_coins[2].append([row, col])
            selected_prob=0.5
        elif selected_prob == 0.5:
            board[row][col] = (turn, 1.0)
            placed_coins[4 if turn=="red" else 0].append([row, col])
            selected_prob=1.0
        else:
            board[row][col] = (turn, 0.96)
            placed_coins[6 if turn=="red" else 5].append([row, col])
            selected_prob=0.96

    else:
        board[row][col] = (turn, selected_prob)
        placed_coins[int(4 - 4 * selected_prob) if turn ==
                 "yellow" else int(4 * selected_prob)].append([row, col])
    if mode >= 1 and selected_prob != 1.0:
        random_num = random.randint(0, 1000)
        if random_num < 150 and len(non_entangled_coins) > 0:
            partner = random.choice(non_entangled_coins)
            non_entangled_coins.remove(partner)
            entangled_coins.append([partner[0], partner[1], entangled_index])
            entangled_coins.append([row, col, entangled_index])
            entangled_index += 1
        else:
            non_entangled_coins.append([row, col])

    if check_win() == "red":
        screen.onclick(None)
        draw_board()
        game_over("red")
        return
    if check_win() == "yellow":
        screen.onclick(None)
        draw_board()
        game_over("yellow")
        return
    turn = "yellow" if turn == "red" else "red"
    draw_board()
    if move_count == 64:
        for r in range(8):
            for c in range(8):
                if [r, c] in placed_coins[1] or [r, c] in placed_coins[2] or [r, c] in placed_coins[3] or [r, c] in placed_coins[5] or [r, c] in placed_coins[6]:
                    if [r, c] in placed_coins[1]:
                        val = [1, 250]
                    elif [r, c] in placed_coins[2]:
                        val = [2, 500]
                    elif [r, c] in placed_coins[3]:
                        val = [3, 750]
                    elif [r, c] in placed_coins[5]:
                        val = [5, 34]
                    else:
                        val = [6, 966]
                    draw_token(50 + c * TILE + TILE // 2,
                               150 + r * TILE + TILE // 2,
                               "blue",
                               1.0,
                               25,
                               fills=False)
                    time.sleep(1)
                    random_number = random.randint(1, 1000)
                    if random_number <= val[1]:
                        placed_coins[4].append([r, c])
                        board[r][c] = ("red", 1.0)
                        placed_coins[val[0]].remove([r, c])
                        draw_token(50 + c * TILE + TILE // 2,
                                   150 + r * TILE + TILE // 2, "red", 1.0)
                        for el in entangled_coins:
                            if el[0] == r and el[1] == c:
                                for el2 in entangled_coins:
                                    if el2[2] == el[2] and el2 != el:
                                        placed_coins[4].append(
                                            [el2[0], el2[1]])
                                        board[el2[0]][el2[1]] = ("red", 1.0)
                                        for i in range(1, 4):
                                            if [el2[0],el2[1]] in placed_coins[i]:
                                                placed_coins[i].remove([el2[0], el2[1]])
                                        draw_token(
                                            50 + el2[1] * TILE + TILE // 2,
                                            150 + el2[0] * TILE + TILE // 2,
                                            "red", 1.0)
                                        entangled_coins.remove(el2)
                                        entangled_coins.remove(el)

                    else:
                        placed_coins[0].append([r, c])
                        board[r][c] = ("yellow", 1.0)
                        placed_coins[val[0]].remove([r, c])
                        draw_token(50 + c * TILE + TILE // 2,
                                   150 + r * TILE + TILE // 2, "yellow", 1.0)
                        for el in entangled_coins:
                            if el[0] == r and el[1] == c:
                                for el2 in entangled_coins:
                                    if el2[2] == el[2] and el2 != el:
                                        placed_coins[0].append([el2[0], el2[1]])
                                        board[el2[0]][el2[1]] = ("yellow", 1.0)
                                        for i in range(1, 4):
                                            if [el2[0],
                                                    el2[1]] in placed_coins[i]:
                                                placed_coins[i].remove([el2[0], el2[1]])
                                        draw_token(
                                            50 + el2[1] * TILE + TILE // 2,
                                            150 + el2[0] * TILE + TILE // 2,
                                            "yellow", 1.0)
                    time.sleep(1)
                    if check_win() == "red":
                        screen.onclick(None)
                        draw_board()
                        game_over("red")
                        return
                    if check_win() == "yellow":
                        screen.onclick(None)
                        draw_board()
                        game_over("yellow")
                        return
                    if check_win() == "redyellow":
                        screen.onclick(None)
                        draw_board()
                        game_over("redyellow")
                        return
        screen.onclick(None)
        draw_board()
        game_over("")
        return


def check_win():
    global placed_coins
    final = [False,False]
    reds = placed_coins[4]
    yellows = placed_coins[0]
    for r in reds:
        if [r[0], r[1] + 1] in reds and [r[0], r[1] + 2] in reds and [r[0], r[1] + 3] in reds:
            final[0] = True
        if [r[0] + 1, r[1]] in reds and [r[0] + 2, r[1]] in reds and [r[0] + 3, r[1]] in reds:
            final[0] = True
        if [r[0] + 1, r[1] + 1] in reds and [r[0] + 2, r[1] + 2] in reds and [r[0] + 3, r[1] + 3] in reds:
            final[0] = True
        if [r[0] + 1, r[1] - 1] in reds and [r[0] + 2, r[1] - 2] in reds and [
                r[0] + 3, r[1] - 3
        ] in reds:
            final[0] = True
        if [r[0], r[1] - 1] in reds and [r[0], r[1] - 2] in reds and [
                r[0], r[1] - 3
        ] in reds:
            final[0] = True
        if [r[0] - 1, r[1]] in reds and [r[0] - 2, r[1]] in reds and [
                r[0] - 3, r[1]
        ] in reds:
            final[0] = True
        if [r[0] - 1, r[1] + 1] in reds and [r[0] - 2, r[1] + 2] in reds and [
                r[0] - 3, r[1] + 3
        ] in reds:
            final[0] = True
        if [r[0] - 1, r[1] - 1] in reds and [r[0] - 2, r[1] - 2] in reds and [
                r[0] - 3, r[1] - 3
        ] in reds:
            final[0] = True
    for y in yellows:
        if [y[0], y[1] + 1] in yellows and [y[0], y[1] + 2] in yellows and [
                y[0], y[1] + 3
        ] in yellows:
            final[1] = True
        if [y[0] + 1, y[1]] in yellows and [y[0] + 2, y[1]] in yellows and [
                y[0] + 3, y[1]
        ] in yellows:
            final[1] = True
        if [y[0] + 1, y[1] + 1] in yellows and [
                y[0] + 2, y[1] + 2
        ] in yellows and [y[0] + 3, y[1] + 3] in yellows:
            final[1] = True
        if [y[0] + 1, y[1] - 1] in yellows and [
                y[0] + 2, y[1] - 2
        ] in yellows and [y[0] + 3, y[1] - 3] in yellows:
            final[1] = True
        if [y[0], y[1] - 1] in yellows and [y[0], y[1] - 2] in yellows and [
                y[0], y[1] - 3
        ] in yellows:
            final[1] = True
        if [y[0] - 1, y[1]] in yellows and [y[0] - 2, y[1]] in yellows and [
                y[0] - 3, y[1]
        ] in yellows:
            final[1] = True
        if [y[0] - 1, y[1] + 1] in yellows and [
                y[0] - 2, y[1] + 2
        ] in yellows and [y[0] - 3, y[1] + 3] in yellows:
            final[1] = True
        if [y[0] - 1, y[1] - 1] in yellows and [
                y[0] - 2, y[1] - 2
        ] in yellows and [y[0] - 3, y[1] - 3] in yellows:
            final[1] = True
    if final==[False, False]:
        return ""
    elif final[0] and final[1]:
        return "redyellow"
    elif final[0]:
        return "red"
    elif final[1]:
        return "yellow"


# -------- Main function --------
if __name__ == "__main__":
    launch_main_menu()
