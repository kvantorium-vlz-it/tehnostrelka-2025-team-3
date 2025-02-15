import prisma from "~/lib/prisma"

interface BodyImage {
    src: string
}

interface BodyPoint {
    title: string
    description: string
    latitude: number
    longitude: number
    images: BodyImage[]
}

interface Body {
    title: string
    description: string
    images: BodyImage[]
    points: BodyPoint[]
}

// body для теста

/**
{
    "title": "route title",
    "description": "route description",
    "images": [
        {
            "src": "route image 1"
        },
        {
            "src": "route image 2"
        }
    ],
    "points": [
        {
            "title": "point title 1",
            "description": "point description 1",
            "latitude": 1,
            "longitude": 1,
            "images": [
                {
                    "src": "route point 1 image 1"
                }
            ]
        },
        {
            "title": "point title 2",
            "description": "point description 2",
            "latitude": 2,
            "longitude": 2,
            "images": [
                {
                    "src": "route point 2 image 1"
                },
                {
                    "src": "route point 2 image 2"
                }
            ]
        }
    ]
}
*/

export default defineEventHandler(async (event) => {
    const body = await readBody<Body>(event)

    const createdRoute = await prisma.route.create({
        data: {
            title: body.title,
            description: body.description,
            // Поправить на пользователя, который залогинен
            authorId: 1,
            routeImages: {
                create: body.images.map((image) => {
                    return {
                        image: {
                            create: {
                                src: image.src,
                            }
                        }
                    }
                })
            },
            routePoints: {
                create: body.points.map((point) => {
                    return {
                        title: point.title,
                        description: point.description,
                        latitude: point.latitude,
                        longitude: point.longitude,
                        routePointImages: {
                            create: point.images.map((image) => {
                                return {
                                    image: {
                                        create: {
                                            src: image.src,
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })

    console.log(createdRoute)

    return createdRoute
})
